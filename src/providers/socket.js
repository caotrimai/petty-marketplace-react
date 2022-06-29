import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import {useDispatch} from 'react-redux'
import {io} from 'socket.io-client'
import {
  addHeaderMessage,
  toastMessage,
} from '~/features/common/redux/commonSlice'
import {refetchOrders} from '~/features/home-page/redux/homePageSlice'
import {shortingAddress} from '~/utils/foundation'

const SocketContext = createContext({})

export const useSocket = () => {
  return useContext(SocketContext)
}

const SocketProvider = ({children}) => {
  const dispatch = useDispatch()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      socket: null,
    },
    undefined,
  )
  const {socket} = state
  
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_SOCKET_URL)
    setState({socket})
  }, [])
  
  const listenEvents = useCallback((socket) => {
    if (socket) {
      socket.on('connect', () => {
        dispatch(toastMessage('Connected to server'))
        }
      )
      socket.on('disconnect', () => {
        dispatch(toastMessage('Disconnected from server'))
        }
      )
      socket.on('ORDER_ADDED', (data) => {
        const notifyMessage = `Token ${data['tokenId']} is sold by user ${shortingAddress(data['seller'])}`
        dispatch(addHeaderMessage({message: notifyMessage}))
        dispatch(refetchOrders())
      })
      socket.on('ORDER_MATCHED', (data) => {
        const notifyMessage = `Token ${data['tokenId']} is bought by user ${shortingAddress(data['buyer'])}`
        dispatch(addHeaderMessage({message: notifyMessage}))
        dispatch(refetchOrders())
      })
      socket.on('ORDER_CANCELED', () => {
        dispatch(refetchOrders())
      })
    }
  },[])

  useEffect(() => {
    listenEvents(socket)
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])
  

  return (
    <SocketContext.Provider value={state}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider