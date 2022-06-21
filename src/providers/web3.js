import detectEthereumProvider from '@metamask/detect-provider'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Web3 from 'web3'
import authAPI from '~/api/authAPI'
import axiosClient from '~/api/axiosClient'
import userAPI from '~/api/userAPI'
import {gold, marketplace, petty} from '~/contract'
import {goldDex} from '~/contract/goldDex'
import {resetUser, setUser} from '~/features/account/redux/accountSlice'
import {toastMessage} from '~/features/common/redux/commonSlice'

const Web3Context = createContext({})

export function useWeb3 () {
  return useContext(Web3Context)
}

const initData = {
  provider: null,
  web3: null,
  currentAccount: null,
  isInitiated: false,
  goldContract: null,
  goldDexContract: null,
  pettyContract: null,
  marketplaceContract: null,
  signature: '',
}

export default function Web3Provider ({children}) {
  const dispatch = useDispatch()
  const reduxUser = useSelector(state => state.account.user)
  
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {...initData},
    undefined,
  )
  const {provider, web3} = state


  const notifyAccountChange = useCallback(() => {
    dispatch(toastMessage('You have changed your account. Please connect wallet again'))
  },[dispatch])

  const loadProvider = useCallback(async () => {
    const provider = await detectEthereumProvider()
    if (provider) {
      try {
        const web3 = new Web3(provider)
        const networkId = await web3.eth.net.getId()
        if (networkId.toString() !== process.env.REACT_APP_NETWORD_ID) {
          dispatch(toastMessage(
            `Please change network to ${process.env.REACT_APP_NETWORD_NAME}`))
          return
        }
        // Load token, nft, marketplace
        const goldContract = new web3.eth.Contract(gold.ABI, gold.ADDRESS)
        const goldDexContract = new web3.eth.Contract(goldDex.ABI, goldDex.ADDRESS)
        const pettyContract = new web3.eth.Contract(petty.ABI, petty.ADDRESS)
        const marketplaceContract = new web3.eth.Contract(marketplace.ABI,
          marketplace.ADDRESS)
        // Load wallet account
        const accounts = await provider.request(
          {method: 'eth_requestAccounts'})
        const metamaskAccount = accounts[0]
        const changedWallet = reduxUser['wallet_address'] !== metamaskAccount
        const currentAccount = changedWallet ? null : metamaskAccount
        if(changedWallet && reduxUser['wallet_address']) {
          notifyAccountChange()
        }
        
        setState({
          provider,
          web3,
          currentAccount,
          goldContract,
          goldDexContract,
          pettyContract,
          marketplaceContract,
        })
      } catch (e) {
        console.error(e)
        dispatch(toastMessage(e.message))
      }
    } else {
      dispatch(toastMessage('Please install metamask'))
    }
  }, [dispatch, notifyAccountChange, reduxUser])

  const verifySignMessage = useCallback(async ({signMessage, signature, walletAddress}) => {
    if(!web3) {
      return false
    }
    try {
      const isValidSignature = web3.utils.isHex(signature)
      if (!isValidSignature) {
        return false
      }
      const authData = await axiosClient.post(authAPI.verifySignature(),
        {signMessage, signature, walletAddress})
      if (authData.accessToken) {
        localStorage.setItem('accessToken', authData.accessToken)
        return true
      }
    } catch (e) {
      dispatch(toastMessage(e.message))
      return false
    }
  }, [web3, dispatch])

  
  const loadSignUser = useCallback(async (walletAddress) => {
    if (!walletAddress) {
      return
    }
    try {
      const signMessage = await axiosClient.get(authAPI.getSignMessage(walletAddress))
      const signature = await web3.eth.personal.sign(signMessage.toString(), walletAddress, '')
      const valid = await verifySignMessage({signMessage, signature, walletAddress})
      if(valid) {
        const user = await axiosClient.get(userAPI.getByWalletAddress(walletAddress))
        dispatch(setUser(user))
        setState({currentAccount:walletAddress, signature})
      }
    } catch (e) {
      dispatch(toastMessage(e.message))
    }
  }, [web3, verifySignMessage, dispatch])

  const loadWalletAccount = useCallback(async () => {
    if(!provider) {
      return
    }
    const accounts = await provider.request(
      {method: 'eth_requestAccounts'})
    const metamaskAccount = accounts[0]
    await loadSignUser(metamaskAccount)
  },[provider, loadSignUser])
  
  useEffect(() => {
    loadProvider()
  },[])
  
  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', async () => {
        notifyAccountChange()
        dispatch(resetUser())
        setState({currentAccount: null})
      })
      provider.on('chainChanged', async (networkId) => {
        if (networkId.toString() !== process.env.REACT_APP_NETWORD_ID) {
          setState({currentAccount: null})
          dispatch(toastMessage(
            `Please change network to ${process.env.REACT_APP_NETWORD_NAME}`))
        }
      })
    }
  }, [provider, dispatch, notifyAccountChange])

  return (
    <Web3Context.Provider value={{...state, loadProvider, loadWalletAccount}}>
      {children}
    </Web3Context.Provider>
  )
}