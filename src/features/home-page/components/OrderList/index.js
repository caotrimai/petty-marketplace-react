import {Row} from 'antd'
import {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import axiosClient from '~/api/axiosClient'
import orderAPI from '~/api/orderAPI'
import {toastMessage} from '~/features/common/redux/commonSlice'
import OrderItem from '~/features/home-page/components/OrderItem'
import SCOrderList from './SC.OrderList'


export default function OrderList () {
  const dispatch = useDispatch()
  const [orderList, setOrderList] = useState([])

  const fetchOrderList = useCallback(() => {
    axiosClient.get(orderAPI.getSellingOrders())
      .then((orderList) => {
        setOrderList(orderList)
      })
      .catch((err) => {
        console.log(err)
        dispatch(toastMessage(err))
      })
  }, [])

  useEffect(() => {
    fetchOrderList()
  }, [fetchOrderList])

  return (
    <SCOrderList className='OrderList'>
      <Row>
        {orderList.length > 0 &&
        orderList.map(order => <OrderItem key={order._id} order={order}/>)}
      </Row>
    </SCOrderList>
  )
}