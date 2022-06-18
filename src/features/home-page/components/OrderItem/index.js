import {Button, Col} from 'antd'
import Divider from '~/components/Divider'

import SCOrderItem from './SC.OrderItem'

export default function OrderItem ({order}) {
  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <SCOrderItem className='OrderItem'>
        <div className='image'>
          <img src={order.image} alt='Image'/>
        </div>
        <div className='infoRow'>
          <div className='name'>{order.name}</div>
          <div className='net'>{order.net}</div>
        </div>
        <div className='infoRow'>
          <div className='OrderItem-amount'>{order.owner}</div>
          <div className='OrderItem-date'>{order.price} GOLD</div>
        </div>
        <Divider/>
        <div className='infoRow' style={{justifyContent: 'center'}}>
          <Button
            style={{marginTop: '10px'}}
            type='primary'
            shape='round'
            size='large'
          >
            Active
          </Button>
        </div>
      </SCOrderItem>
    </Col>
  )
}