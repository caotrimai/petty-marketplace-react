const endPoint = '/pet-nft';

class NftAPI {
  
  // [POST]
  create = () => `${endPoint}/create`
  
}

const nftAPI = new NftAPI()
export default nftAPI