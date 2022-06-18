import {Row} from 'antd'
import OrderItem from '~/features/home-page/components/OrderItem'
import SCOrderList from './SC.OrderList'

// const image = 'https://api-test.nft.marketplace.200lab.io/assets/pets/pets_3.png'
const image = 'https://static.ybox.vn/2021/6/6/1624709283279-thoa-nguyen41buqrvo-avatar.png'
const orders = [
  {
    id: 1,
    net: 'BSC',
    name: 'Wookie',
    owner: 'John',
    price: '100',
    image
  },{
    id: 2,
    net: 'BSC',
    name: 'Karl',
    owner: 'Tim',
    price: '200',
    image
  },{
    id: 3,
    net: 'BSC',
    name: 'Ebony',
    owner: 'Alex',
    price: '200',
    image
  },{
    id: 4,
    net: 'BSC',
    name: 'Wookie',
    owner: 'John',
    price: '100',
    image
  },{
    id: 5,
    net: 'BSC',
    name: 'Karl',
    owner: 'Tim',
    price: '200',
    image
  },{
    id: 6,
    net: 'BSC',
    name: 'Ebony',
    owner: 'Alex',
    price: '200',
    image
  },
]

export default function OrderList() {
  
  return (
    <SCOrderList className='OrderList'>
      <Row>
        {orders.map(order => <OrderItem key={order.id} order={order}/>)}
      </Row>
    </SCOrderList>
  )
}