import {Button, Col, Modal} from 'antd'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import Divider from '~/components/Divider'
import {marketplace} from '~/contract'
import {toastMessage} from '~/features/common/redux/commonSlice'
import BuyModalContent from '../BuyModalContent'
import {useWeb3} from '~/providers/web3'
import {shortingAddress} from '~/utils/foundation'
import defaultImage from '~/assets/images/default-avatar.png'

import SCOrderItem from './SC.OrderItem'

export default function OrderItem ({order}) {
  const dispatch = useDispatch()
  const {
    web3,
    currentAccount,
    goldContract,
    marketplaceContract,
    loadWalletAccount,
  } = useWeb3()
  const [image, setImage] = useState('')
  const [approved, setApproved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {nft} = order
  let price = 0
  if (web3 && order.price) {
    price = web3.utils.fromWei(order.price, 'ether')
  }

  useEffect(() => {
    if (nft['nft_id']) {
      axiosClient.get(nftAPI.getImage(nft['nft_id']))
        .then(({image}) => {
          setImage(image)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [nft])

  const handleImageError = ({currentTarget}) => {
    currentTarget.onerror = null // prevents looping
    currentTarget.src = defaultImage
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
  }

  const approveToken = () => {
    if (!goldContract) {
      return
    }
    setLoading(true)
    goldContract.methods.approve(marketplace.ADDRESS, order.price)
      .send({from: currentAccount})
      .then(() => {
        setApproved(true)
        dispatch(toastMessage('Approved successfully'))
      })
      .catch((err) => {
        console.log(err)
        dispatch(toastMessage(err))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const buyNft = () => {
    setLoading(true)
    marketplaceContract.methods.executeOrder(order['order_id'])
      .send({from: currentAccount})
      .then(() => {
        setApproved(false)
        hideModal()
        dispatch(toastMessage('Buy NFT success'))
      })
      .catch((err) => {
        console.log(err)
        dispatch(toastMessage(err))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSubmit = () => {
    if (!approved) {
      approveToken()
      return
    }
    buyNft()
  }

  const handleClickBuy = () => {
    if (currentAccount) {
      showModal()
    } else {
      loadWalletAccount()
    }
  }
  
  const showButtonLabel = () => {
    if (currentAccount) {
      if(currentAccount === order.seller) {
        return 'Selling'
      }
      return 'Buy'
    }
    return 'Login to buy'
  }

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <SCOrderItem className='OrderItem'>
        <div className='image'>
          <img src={image} alt='Image' onError={handleImageError}/>
        </div>
        <div className='infoRow'>
          <div className='label'>Order ID</div>
          <div className='value'>{order['order_id']}</div>
        </div>
        <div className='infoRow'>
          <div className='label'>Token ID</div>
          <div className='value'>{nft['nft_id']}</div>
        </div>
        <div className='infoRow'>
          <div className='label'>Seller</div>
          <div className='value'>{shortingAddress(order['seller'])}</div>
        </div>
        <div className='infoRow'>
          <div className='label'>Price</div>
          <div className='value price'>{price} <span>GOLD</span></div>
        </div>
        <Divider/>
        <div className='infoRow' style={{justifyContent: 'center'}}>
          <Button
            style={{marginTop: '10px'}}
            type='primary'
            shape='round'
            size='large'
            onClick={handleClickBuy}
          >
            {showButtonLabel()}
          </Button>
        </div>
        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={hideModal}
        >
          <BuyModalContent
            tokenId={nft['nft_id']}
            price={price}
            approved={approved}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </Modal>
      </SCOrderItem>
    </Col>
  )
}