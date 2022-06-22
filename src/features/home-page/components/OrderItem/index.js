import {Button, Col, Modal} from 'antd'
import {useEffect, useState} from 'react'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import Divider from '~/components/Divider'
import BuyModalContent from '../BuyModalContent'
import {useWeb3} from '~/providers/web3'
import {shortingAddress} from '~/utils/foundation'
import defaultImage from '~/assets/images/default-avatar.png'

import SCOrderItem from './SC.OrderItem'

export default function OrderItem ({order}) {
  const {web3} = useWeb3()
  const [image, setImage] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <SCOrderItem className='OrderItem'>
        <div className='image'>
          <img src={image} alt='Image' onError={handleImageError}/>
        </div>
        <div className='infoRow'>
          <div className='label'>Seller</div>
          <div className='value'>{shortingAddress(nft['owner_address'])}</div>
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
            onClick={showModal}
          >
            Buy
          </Button>
        </div>
      </SCOrderItem>
      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <BuyModalContent/>
      </Modal>
    </Col>
  )
}