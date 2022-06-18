//Pages
import {routeConfig} from '~/configs'
import HomePage from '~/features/home-page/page'
import AccountPage from '~/features/account/page'
import CreatingNFTPage from '~/features/create-nft/page'


const publicRoutes = [
  {path: routeConfig.ROUTE_LINK.HOME, component: HomePage},
  {path: routeConfig.ROUTE_LINK.ACCOUNT, component: AccountPage},
  {path: routeConfig.ROUTE_LINK.CREATE_NFT, component: CreatingNFTPage},
];

const privateRoutes = [];

export {publicRoutes, privateRoutes}