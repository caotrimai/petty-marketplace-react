import SCNftCard from './SCNftCart'

export default function NftCart ({nft}) {

  return (
    <SCNftCard>
      <div className='image'>
        <img src={nft['image']} alt={nft['name']}/>
      </div>
      <div className='fields'>
        <div className='field nft-id'>
          <span>ID</span>
          <span>{nft['nft_id']}</span>
        </div>
        <div className='field name'>
          <span>Name</span>
          <span>{nft['name']}</span>
        </div>
        <div className='field gender'>
          <span>Gender</span>
          <span>{nft['gender']}</span>
        </div>
        <div className='field element'>
          <span>Element</span>
          <span>{nft['element']}</span>
        </div>
        <div className='field hp'>
          <span>HP</span>
          <span>{nft['stats_hp']}</span>
        </div>
        <div className='field attack'>
          <span>Attack</span>
          <span>{nft['stats_attack']}</span>
        </div>
      </div>
    </SCNftCard>
  )
}