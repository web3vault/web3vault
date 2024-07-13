import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PrivyProvider } from '@privy-io/react-auth';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProvider
        config={{"appearance":{"accentColor":"#38CCCD","theme":"#222224","showWalletLoginFirst":false,loginMessage: 'The web3 password manager', "logo":"https://aqua-abstract-trout-227.mypinata.cloud/ipfs/QmeBvMLqiXiDE5xPX9X1KkfLB8BAkDkZddZ6QXzLYQvsfq"},"loginMethods":["email","sms","wallet","google","github","farcaster"],"embeddedWallets":{"createOnLogin":"users-without-wallets","requireUserPasswordOnCreate":false},"mfa":{"noPromptOnMfaRequired":false}}}
        appId='clydhhyun0jnpecwk9sfqq4j1'
      >
      <App />
    </PrivyProvider>
  </React.StrictMode>,
)
