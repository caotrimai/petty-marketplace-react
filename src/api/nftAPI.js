const endPoint = '/pet-nft';

class NftAPI {
  
  // [POST]
  create = () => `${endPoint}/create`
  
  // [GET]
  getByOwner = (owner) => `${endPoint}/account/${owner}`
  
  // [GET]
  getImage = (tokenId) => `${endPoint}/image?id=${tokenId}`
  
}

const nftAPI = new NftAPI()
export default nftAPI