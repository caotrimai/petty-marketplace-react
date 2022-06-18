import {faWallet} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useWeb3} from '~/providers/web3'
import {shortingAddress} from '~/utils/foundation'
import SCConnectButton from './SC.ConnectButton'

const defaultFn = async () => {}

export default function ConnectButton () {
  const {currentAccount, loadWalletAccount} = useWeb3()
  
  return (
    <SCConnectButton onClick={currentAccount ? defaultFn : loadWalletAccount}>
      <FontAwesomeIcon icon={faWallet}/>
      {currentAccount ? shortingAddress(currentAccount) : 'Connect wallet'}
    </SCConnectButton>
  )
}