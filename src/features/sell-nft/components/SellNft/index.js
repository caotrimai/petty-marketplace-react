import {useEffect, useReducer} from 'react'
import {useDispatch} from 'react-redux'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import {toastMessage} from '~/features/common/redux/commonSlice'
import {useWeb3} from '~/providers/web3'

export default function SellNft () {
  const dispatch = useDispatch()
  const {web3, currentAccount} = useWeb3()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      nftList: [],
    }, undefined,
  )

  useEffect(() => {
    if (currentAccount) {
      axiosClient.get(nftAPI.getByOwner(currentAccount))
        .then((nftList) => {
          console.log(nftList)
          setState({nftList})
        })
        .catch((err) => {
          console.log(err)
          dispatch(toastMessage(err))
        })
    }
  }, [currentAccount])

  return (
    <div>
      <h1>SellNft</h1>
    </div>
  )
}