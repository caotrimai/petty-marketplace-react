//Pages
import {routeConfig} from '~/configs'
import GoldDexPage from '~/features/gold-dex/page'
import HomePage from '~/features/home-page/page'
import AccountPage from '~/features/account/page'
import CreatingNFTPage from '~/features/create-nft/page'
import SellNFTPage from '~/features/sell-nft/page'


const publicRoutes = [
  {path: routeConfig.ROUTE_LINK.HOME, component: HomePage},
  {path: routeConfig.ROUTE_LINK.ACCOUNT, component: AccountPage},
  {path: routeConfig.ROUTE_LINK.CREATE_NFT, component: CreatingNFTPage},
  {path: routeConfig.ROUTE_LINK.GOLD_DEX, component: GoldDexPage},
  {path: routeConfig.ROUTE_LINK.SELL_NFT, component: SellNFTPage},
];

const privateRoutes = [];

export {publicRoutes, privateRoutes}