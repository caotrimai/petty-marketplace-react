import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import SCBuyModalContent from './SC.BuyModalContent'

export default function BuyModalContent ({
  tokenId,
  price = 0,
  approved = false,
  onSubmit = () => {},
  loading = false,
}) {
  
  
  return (
    <SCBuyModalContent>
      <h2 className='title'>Buy</h2>
      <div className='row'>
        <div className='label'>ID</div>
        <div className='value'>{tokenId}</div>
      </div>
      <div className='row'>
        <div className='label'>Price</div>
        <div className='value'>{price}</div>
      </div>
      <div className='row'>
        <div className='label'>Service Fee</div>
        <div className='value'>0</div>
      </div>
      <div className='row'>
        <div className='label'>Total</div>
        <div className='value'>{price}</div>
      </div>
      <button onClick={onSubmit} className='submit-button'>
        {loading &&
        <FontAwesomeIcon className='icon-loading' icon={faSpinner}/>}
        <span>{approved ? 'Buy' : 'Approve'}</span>
      </button>
    </SCBuyModalContent>
  )
}