import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from '~/app/store'
import DefaultStyleVariables from '~/components/DefaultStyleVariables'
import GlobalStyles from '~/components/GlobalStyle'
import Toastify from '~/providers/toastify'
import Web3Provider from '~/providers/web3'

export default function RootWrapper ({children}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DefaultStyleVariables>
          <GlobalStyles>
            <Toastify>
              <Web3Provider>
                {children}
              </Web3Provider>
            </Toastify>
          </GlobalStyles>
        </DefaultStyleVariables>
      </PersistGate>
    </Provider>
  )
}