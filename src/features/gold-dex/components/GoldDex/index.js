import {faArrowsRotate, faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Input} from 'antd'
import {useEffect, useReducer} from 'react'
import {useDispatch} from 'react-redux'
import {goldDex} from '~/contract/goldDex'
import {toastMessage} from '~/features/common/redux/commonSlice'
import {useWeb3} from '~/providers/web3'
import SCGoldDex from './SCGoldDex'

export default function GoldDex () {
  const dispatch = useDispatch()
  const {
    web3,
    currentAccount,
    goldContract,
    goldDexContract,
    loadWalletAccount,
  } = useWeb3()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      fromValue: 0.0,
      toValue: 0.0,
      buyRatio: 0,
      sellFee: 0,
      loading: false,
      swapped: false,
      approved: false,
    },
    undefined)
  const {
    fromValue,
    toValue,
    buyRatio,
    sellFee,
    swapped,
    approved,
    loading,
  } = state

  useEffect(() => {
    setState({approved: false})
  },[currentAccount])
  
  useEffect(() => {
    if (goldDexContract) {
      goldDexContract.methods.BUY_RATIO().call().then(val => {
        setState({buyRatio: Number(val)})
      }).catch(err => {
        dispatch(toastMessage(err.message))
      })
      goldDexContract.methods.SELL_FEE().call().then(val => {
        setState({sellFee: Number(val)})
      }).catch(err => {
        dispatch(toastMessage(err.message))
      })
    }
  }, [goldDexContract, dispatch])

  useEffect(() => {
    let toValue
    if (swapped) {
      const gotRatio = (100 - sellFee) / 100
      toValue = (fromValue * gotRatio) / buyRatio
    } else {
      toValue = buyRatio * fromValue
    }
    setState({toValue})
  }, [fromValue, buyRatio, sellFee])

  const handleInputKeyPress = (event) => {
    if (!/[0-9/.]/.test(event.key)) {
      event.preventDefault()
    }
  }

  const handleFromChange = (event) => {
    if (event.target.value.length === 0) {
      setState({fromValue: 0})
      return
    }
    if (isNaN(Number(event.target.value))) {
      return
    }
    setState({fromValue: event.target.value})
  }

  const handleToChange = (event) => {
    if (isNaN(Number(event.target.value))) {
      return
    }
    setState({toValue: event.target.value})
  }

  const handleBuyGold = () => {
    setState({loading: true})
    const bnbAmount = web3.utils.toWei(fromValue.toString(), 'ether')
    goldDexContract.methods.buy()
      .send({from: currentAccount, value: bnbAmount})
      .then(() => {
        dispatch(toastMessage('Transfer sent successfully'))
      })
      .finally(() => {
        setState({loading: false})
      })
  }

  const handleApproval = () => {
    setState({loading: true})
    const amount = web3.utils.toWei(fromValue.toString(), 'ether')
    goldContract.methods.approve(goldDex.ADDRESS, amount)
      .send({from: currentAccount})
      .then(() => {
        setState({approved: true})
        dispatch(toastMessage('Approval successfully'))
      })
      .finally(() => {
        setState({loading: false})
      })
  }

  const handleSellGold = () => {
    if (!approved) {
      handleApproval()
      return
    }
    setState({loading: true})
    const amount = web3.utils.toWei(fromValue.toString(), 'ether')
    goldDexContract.methods.sell(amount)
      .send({from: currentAccount})
      .then(() => {
        dispatch(toastMessage('Transfer sent successfully'))
        setState({approved: false})
      })
      .finally(() => {
        setState({loading: false})
      })
  }

  const handleClickSubmit = () => {
    if (!currentAccount || !goldDexContract) {
      loadWalletAccount()
      return
    }
    if (swapped) {
      handleSellGold()
    } else {
      handleBuyGold()
    }
  }

  const handleSwap = () => {
    setState({
      swapped: !swapped,
      fromValue: 0,
      toValue: 0,
    })
  }

  const getButtonLabel = () => {
    if (!currentAccount) {
      return 'Connect Wallet'
    }
    if (!swapped) {
      return 'Buy GOLD'
    } else {
      if (!approved) {
        return 'Approval'
      }
      return 'Sell'
    }

  }

  return (
    <SCGoldDex>
      <div className='wrapper'>
        <div className='header'>
          <div className='title'>Swap</div>
          <div className='description'>Trade tokens in an instant</div>
        </div>
        <div className='body'>
          <div className='from'>
            <div className='title'>From {swapped ? 'GOLD' : 'BNB'}</div>
            <Input
              onKeyPress={handleInputKeyPress}
              onChange={handleFromChange}
              placeholder='Enter amount'
              value={fromValue}
            />
          </div>
          <div className='swap'>
            <FontAwesomeIcon
              onClick={handleSwap}
              className='icon-swap'
              icon={faArrowsRotate}
            />
          </div>
          <div className='to'>
            <div className='title'>To {swapped ? 'BNB' : 'GOLD'}</div>
            <Input
              disabled
              onKeyPress={handleInputKeyPress}
              onChange={handleToChange}
              placeholder='Enter amount'
              value={toValue}
            />
            {swapped && <div className='fee'>Fee is {sellFee}%</div>}
          </div>
          <div className='button'>
            <button disabled={loading} onClick={handleClickSubmit}>
              {loading &&
              <FontAwesomeIcon className='icon-loading' icon={faSpinner}/>}
              <span>{getButtonLabel()}</span>
            </button>
          </div>
        </div>
      </div>
    </SCGoldDex>
  )
}