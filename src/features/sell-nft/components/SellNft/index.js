import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Input, Select} from 'antd'
import {useCallback, useEffect, useReducer} from 'react'
import {useDispatch} from 'react-redux'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import {gold, marketplace} from '~/contract'
import {toastMessage} from '~/features/common/redux/commonSlice'
import NftCart from '~/features/gold-dex/components/NftCart'
import {handleNumberInputKeyPress} from '~/utils/foundation'
import SCSellNft from './SCSellNft'
import {useWeb3} from '~/providers/web3'

const {Option} = Select

export default function SellNft () {
  const dispatch = useDispatch()
  const {web3, currentAccount, pettyContract, marketplaceContract} = useWeb3()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      nftList: [],
      selectedNft: {},
      price: 0,
      loading: false,
      approved: false,
    }, undefined,
  )
  const {nftList, selectedNft, price, loading, approved} = state

  const fetchNftList = useCallback((currentAccount) => {
    axiosClient.get(nftAPI.getByOwner(currentAccount))
      .then((nftList) => {
        setState({nftList})
      })
      .catch((err) => {
        console.log(err)
        dispatch(toastMessage(err))
      })
  },[dispatch])
  
  useEffect(() => {
    if (currentAccount) {
      fetchNftList(currentAccount)
    }
  }, [fetchNftList, currentAccount])

  const handleChange = (id) => {
    if (id) {
      const selectedNft = nftList.find(nft => nft['nft_id'] === id)
      setState({selectedNft})
    }
  }

  const handlePriceChange = (event) => {
    if (event.target.value.length === 0) {
      setState({price: 0})
      return
    }
    if (isNaN(Number(event.target.value))) {
      return
    }
    setState({price: event.target.value})
  }

  const handleApproval = () => {
    setState({loading: true})
    pettyContract.methods.approve(marketplace.ADDRESS, selectedNft['nft_id'])
      .send({from: currentAccount})
      .then(() => {
        setState({approved: true})
      })
      .catch((err) => {
        dispatch(toastMessage(err))
      })
      .finally(() => {
        setState({loading: false})
      })
  }

  const handleSellNft = () => {
    setState({loading: true})
    marketplaceContract.methods.addOrder(
      selectedNft['nft_id'],
      gold.ADDRESS,
      web3.utils.toWei(price, 'ether'),
    ).send({from: currentAccount})
      .then(() => {
        setState({selectedNft: {}})
        fetchNftList(currentAccount)
        dispatch(toastMessage('Post selling nft success'))
      })
      .catch(err => {
        dispatch(toastMessage(err.message))
      })
      .finally(() => {
        setState({loading: false})
      })
  }

  const handleClickSubmit = (e) => {
    e && e.preventDefault()
    if (!price) {
      dispatch(toastMessage('Price is not valid'))
      return
    }
    if (!approved) {
      handleApproval()
      return
    }
    handleSellNft()
  }

  return (
    <SCSellNft className='SellNft'>
      <div className='wrapper'>
        <Select
          placeholder='Select your NFT'
          style={{width: 300}}
          onChange={handleChange}
        >
          {nftList.map((nft) => (
            <Option
              key={nft['nft_id']}
              value={nft['nft_id']}
            >
              {`${nft['nft_id']} - ${nft['name']}`}
            </Option>
          ))}
        </Select>
        {selectedNft['nft_id'] && <NftCart nft={selectedNft}/>}
        {selectedNft['nft_id'] &&
        <div className='actions'>
          <Input
            addonAfter='GOLD'
            onKeyPress={handleNumberInputKeyPress}
            onChange={handlePriceChange}
            placeholder='Enter amount'
            value={price}
          />
          <div className='button'>
            <button disabled={loading} onClick={handleClickSubmit}>
              {loading &&
              <FontAwesomeIcon className='icon-loading' icon={faSpinner}/>}
              <span>{approved ? 'Sell' : 'Approve'}</span>
            </button>
          </div>
        </div>
        }
      </div>
    </SCSellNft>
  )
}