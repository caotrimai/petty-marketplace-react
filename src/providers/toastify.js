import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {resetToast} from '~/features/common/redux/commonSlice'

export default function Toastify ({children}) {
  const dispatch = useDispatch()
  const toastObject = useSelector(state => state.common.toast)
  const {message} = toastObject

  useEffect(() => {
    if (message) {
      toast(message)
      dispatch(resetToast())
    }
  }, [message, dispatch])

  return (
    <>
      {children}
      <ToastContainer autoClose={5000}/>
    </>
  )
}