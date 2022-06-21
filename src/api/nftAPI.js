const endPoint = '/pet-nft';

class NftAPI {
  
  // [POST]
  create = () => `${endPoint}/create`
  
  // [GET]
  getByOwner = (owner) => `${endPoint}/get-by-owner?owner=${owner}`
  
}

const nftAPI = new NftAPI()
export default nftAPI