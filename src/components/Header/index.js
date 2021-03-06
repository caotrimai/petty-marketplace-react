import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ConnectButton from '~/components/ConnectButton'
import HeaderNotification from '~/components/HeaderNotification'
import {routeConfig} from '~/configs'
import SCHeader from './SC.Header'

const links = [
  {label: 'Home', to: routeConfig.ROUTE_LINK.HOME},
  {label: 'Account', to: routeConfig.ROUTE_LINK.ACCOUNT},
  {label: 'Create NFT', to: routeConfig.ROUTE_LINK.CREATE_NFT, role: 'admin'},
  {label: 'Gold Dex', to: routeConfig.ROUTE_LINK.GOLD_DEX},
  {label: 'Sell NFT', to: routeConfig.ROUTE_LINK.SELL_NFT},
]

export default function Header () {
  const {user = {}} = useSelector(state => state.account)

  return (
    <SCHeader>
      <div className='main'>
        <div className='logo'>Petty</div>
        <div className='menu'>
          {links.map(({label, to, role}) => {
            if (role && role !== user.role) return null
            return (
              <div className='navItem' key={to}>
                <NavLink to={to}>
                  <div className='menuItem'>
                    {label}
                  </div>
                </NavLink>
              </div>
            )
          })}
        </div>
        <ConnectButton/>
      </div>
      <HeaderNotification/>
    </SCHeader>
  )
}