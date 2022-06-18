const endPoint = '/user'

class UserAPI {
  // [GET]
  getAll = () => `${endPoint}/get-all`

  // [GET]
  getById = () => `${endPoint}/get-by-id`

  // [POST]
  create = () => `${endPoint}/create`

  // [PUT]
  update = (id) => `${endPoint}/update/${id}`

  // [DELETE]
  delete = () => `${endPoint}/delete`

  // [GET]
  getByWalletAddress = (walletAddress) => `${endPoint}/wallet/${walletAddress.toLowerCase()}`
  
}

const userAPI = new UserAPI()
export default userAPI