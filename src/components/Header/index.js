import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ConnectButton from '~/components/ConnectButton'
import {routeConfig} from '~/configs'
import SCHeader from './SC.Header'

const links = [
  {label: 'Home', to: routeConfig.ROUTE_LINK.HOME},
  {label: 'Account', to: routeConfig.ROUTE_LINK.ACCOUNT, role: 'user'},
  {label: 'Create NFT', to: routeConfig.ROUTE_LINK.CREATE_NFT, role: 'admin'},
  {label: 'Gold Dex', to: routeConfig.ROUTE_LINK.GOLD_DEX},
  {label: 'Sell NFT', to: routeConfig.ROUTE_LINK.SELL_NFT, role: 'admin'},
]

export default function Header () {
  const {user = {}} = useSelector(state => state.account)

  return (
    <SCHeader>
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
    </SCHeader>
  )
}