const endPoint = '/auth'

class AuthAPI {
    // [GET]
  getSignMessage = (walletAddress) => `${endPoint}/sign-message/${walletAddress.toLowerCase()}`
  
  // [GET]
  getByWalletAddress = (walletAddress) => `${endPoint}/wallet/${walletAddress.toLowerCase()}`

  // [POST]
  verifySignature = () => `${endPoint}/verify-signature`
  
}

const authAPI = new AuthAPI()
export default authAPI