import {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {uid} from 'uid'
import axiosClient from '~/api/axiosClient'
import orderAPI from '~/api/orderAPI'
import {toastMessage} from '~/features/common/redux/commonSlice'
import {useWeb3} from '~/providers/web3'

export default function useUserSellingNftList() {
  const dispatch = useDispatch()
  const {currentAccount: userAddress} = useWeb3()
  const [sellingList, setSellingList] = useState([])
  const [shouldReFetch, setReFetch] = useState('');

  const fetchNftList = useCallback((userAddress) => {
    axiosClient.get(orderAPI.getSellingOrders({seller: userAddress}))
      .then((orders) => {
        const sellingList = orders.map(({nft, price}) => ({price, ...nft}))
        setSellingList(sellingList)
      })
      .catch((err) => {
        console.log(err)
        dispatch(toastMessage(err))
      })
  },[dispatch])
  
  const reFetch = () => {
    setReFetch(uid())
  }

  useEffect(() => {
    if (userAddress) {
      fetchNftList(userAddress)
    }
  }, [userAddress, shouldReFetch])
  
  return [sellingList, reFetch]
}