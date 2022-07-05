import {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {uid} from 'uid'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import {toastMessage} from '~/features/common/redux/commonSlice'
import {useWeb3} from '~/providers/web3'

export default function useUserNftList() {
  const dispatch = useDispatch()
  const {currentAccount: userAddress} = useWeb3()
  const [nftList, setNftList] = useState([])
  const [shouldReFetch, setReFetch] = useState('');

  const fetchNftList = useCallback((userAddress) => {
    axiosClient.get(nftAPI.getByOwner(userAddress))
      .then((nftList) => {
        setNftList(nftList)
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
    } else {
      setNftList([])
    }
  }, [userAddress, shouldReFetch, fetchNftList])
  
  return [nftList, reFetch]
}