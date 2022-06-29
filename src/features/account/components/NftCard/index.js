import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button} from 'antd'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import defaultImage from '~/assets/images/default-avatar.png'
import {toastMessage} from '~/features/common/redux/commonSlice'
import {useWeb3} from '~/providers/web3'
import SCNftCard from './SC.NftCard'

const defaultFn = () => {}
export default function NftCard ({
  nft,
  selling,
  onCancelOrderSuccess = defaultFn,
}) {
  const {
    web3,
    currentAccount,
    marketplaceContract,
  } = useWeb3()
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  let price = 0
  if (web3 && nft['price']) {
    price = web3.utils.fromWei(nft['price'], 'ether')
  }

  useEffect(() => {
    if (selling && nft['nft_id']) {
      axiosClient.get(nftAPI.getImage(nft['nft_id']))
        .then(({image}) => {
          setImage(image)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [nft, selling])

  const handleImageError = ({currentTarget}) => {
    currentTarget.onerror = null // prevents looping
    currentTarget.src = defaultImage
  }

  const handleCancelOrder = () => {
    setLoading(true)
    marketplaceContract.methods.cancelOrder(nft['orderId'])
      .send({from: currentAccount})
      .then(() => {
        dispatch(toastMessage('Order cancelled'))
        onCancelOrderSuccess()
      })
      .catch((err) => {
        console.log(err)
        dispatch(toastMessage(err))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <SCNftCard className='nft-card'>
      <div className='image'>
        <img src={selling ? image : nft['image']} alt='Image'
             onError={handleImageError}/>
      </div>
      <div className='infoRow'>
        <div className='label'>Token ID</div>
        <div className='value'>{nft['nft_id']}</div>
      </div>
      <div className='infoRow'>
        <div className='label'>Name</div>
        <div className='value'>{nft['name']}</div>
      </div>
      <div className='infoRow'>
        <div className='label'>Gender</div>
        <div className='value'>{nft['gender']}</div>
      </div>
      <div className='infoRow'>
        <div className='label'>Element</div>
        <div className='value'>{nft['element']}</div>
      </div>
      <div className='infoRow'>
        <div className='label'>HP</div>
        <div className='value'>{nft['stats_hp']}</div>
      </div>
      <div className='infoRow'>
        <div className='label'>Attack</div>
        <div className='value'>{nft['stats_attack']}</div>
      </div>
      {selling && <>
        <div className='infoRow'>
          <div className='label'>Price</div>
          <div className='value price'>{price} <span>GOLD</span></div>
        </div>
        <div className='infoRow'>
          <Button
            style={{width: '100%', marginTop: '10px'}}
            type='primary'
            shape='round'
            size='large'
            onClick={handleCancelOrder}
          >
            {loading &&
              <FontAwesomeIcon className='icon-loading' icon={faSpinner}/>}
            Cancel
          </Button>
        </div>
      </>
      }
    </SCNftCard>
  )
}