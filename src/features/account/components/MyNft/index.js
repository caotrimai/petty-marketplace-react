import {Col, Row} from 'antd'
import {useUserNftList, useUserSellingNftList} from '~/customhooks'
import NftCard from '../NftCard'
import SCMyNft from './SC.MyNft'

const Card = ({children}) => {
  return <Col xs={24} sm={12} md={6} lg={6} xl={6}>{children}</Col>
}

export default function MyNft () {
  const [nftList] = useUserNftList()
  const [sellingList, reFetchSelling] = useUserSellingNftList()
 

  return (
    <SCMyNft className='MyNft'>
      <h3>My available NFT: {nftList.length} items</h3>
      <Row>
        {nftList.length > 0 &&
          nftList.map(nft => (
            <Card key={nft['nft_id']}>
              <NftCard nft={nft}/>
            </Card>
          ))}
      </Row>

      <h3>My selling NFT: {sellingList.length} items</h3>
      <Row>
        {sellingList.length > 0 &&
          sellingList.map(nft => (
            <Card key={nft['nft_id']}>
              <NftCard nft={nft} selling onCancelOrderSuccess={reFetchSelling}/>
            </Card>
          ))}
      </Row>
    </SCMyNft>
  )
}