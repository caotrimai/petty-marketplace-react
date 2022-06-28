const endPoint = '/order'
const PER_PAGE = 10
const PAGE = 0

class OrderAPI {
  // [GET]
  getSellingOrders = ({seller, buyer, perPage = PER_PAGE, page = PAGE} = {}) => {
    let uri = `${endPoint}/selling?perPage=${perPage}&page=${page}`
    if(seller) {
      uri += `&seller=${seller}`
    }
    if(buyer) {
      uri += `&buyer=${buyer}`
    }
    return uri
  }
}

const orderAPI = new OrderAPI()

export default orderAPI