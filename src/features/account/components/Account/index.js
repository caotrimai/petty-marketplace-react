import {faFileClipboard, faPen} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useReducer} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard/lib/Component'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import SCAccount from '~/features/account/components/Account/SCAccount'
import MyNft from '~/features/account/components/MyNft'
import NameInputForm from '~/features/account/components/NameInputForm'
import {shortingAddress, shortingName} from '~/utils/foundation'

const AvatarStyle = styled.div`
  width: 23.7rem;
  height: 23.7rem;
  min-width: 23.7rem;
  border-radius: 50%;
  background-color: #e74c3d;
  color: #fff;
  font-size: 10rem;
  text-align: center;
  line-height: 23.7rem;
`

const InfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  & .title {
    font-size: 1.8rem;
  }

  & .name {
    font-size: 3.6rem;
    font-weight: bold;
  }

  & .address {
    width: fit-content;
    padding: .5rem 2rem;
    border-radius: 2rem;
    font-size: 1.8rem;
    background-color: var(--white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    opacity: .5;

    & span + svg {
      margin-left: 1rem;
      cursor: pointer;
    }
  }
`

export default function Account () {
  const user = useSelector(state => state.account.user)
  const {
    display_name: displayName = 'No name',
    wallet_address: walletAddress = '',
  } = user
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      onEditName: false,
    },
    undefined,
  )
  const {onEditName} = state

  const hideNameInput = () => {
    setState({onEditName: false})
  }

  return (
    <SCAccount className='Account'>
      <div className='row'>
        <AvatarStyle>
          {shortingName(displayName)}
        </AvatarStyle>
        <InfoStyle className='info'>
          <div className='title'>Account information</div>
          {!onEditName && (
            <div className='name'>
              <span>{displayName}</span>
              <FontAwesomeIcon
                style={{
                  fontSize: '1.6rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  color: 'var(--gray-3)',
                }}
                icon={faPen}
                onClick={() => setState({onEditName: true})}
              />
            </div>
          )}
          {onEditName && (
            <NameInputForm
              onSaveSuccess={hideNameInput}
              onSaveCancel={hideNameInput}
            />
          )}
          <div className='address'>
            <span> {shortingAddress(walletAddress)}</span>
            <CopyToClipboard text={walletAddress}>
              <FontAwesomeIcon icon={faFileClipboard}/>
            </CopyToClipboard>
          </div>
        </InfoStyle>
      </div>
      <MyNft/>
    </SCAccount>
  )
}