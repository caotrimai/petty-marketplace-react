const endPoint = '/order'

class OrderAPI {
  // [GET]
  getSellingOrders = () => `${endPoint}/selling`
}

const orderAPI = new OrderAPI()

export default orderAPI