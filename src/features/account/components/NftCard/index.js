import {useEffect, useState} from 'react'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import defaultImage from '~/assets/images/default-avatar.png'
import {useWeb3} from '~/providers/web3'
import SCNftCard from './SC.NftCard'

export default function NftCard ({nft, selling}) {
  const {web3} = useWeb3()
  const [image, setImage] = useState('')
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

  return (
    <SCNftCard className='nft-card'>
      <div className='image'>
        <img src={selling ? image : nft['image']} alt='Image' onError={handleImageError}/>
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
      {selling && 
        <div className='infoRow'>
          <div className='label'>Price</div>
          <div className='value price'>{price} <span>GOLD</span></div>
        </div>
      }
    </SCNftCard>
  )
}