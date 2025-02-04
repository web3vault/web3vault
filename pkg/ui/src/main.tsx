import React from "react";
import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { privyConfig } from "./privyConfig";
import { wagmiConfig } from "./wagmiConfig";
import { config } from "./wagmi.ts";
import { PrivyProvider } from "@privy-io/react-auth";

globalThis.Buffer = Buffer;
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Partners: Privy Integration
  <React.StrictMode>
    <PrivyProvider
      config={{
        appearance: {
          accentColor: "#38CCCD",
          theme: "#222224",
          showWalletLoginFirst: false,
          loginMessage: "The web3 password manager",
          logo: "https://aqua-abstract-trout-227.mypinata.cloud/ipfs/QmeBvMLqiXiDE5xPX9X1KkfLB8BAkDkZddZ6QXzLYQvsfq",
        },
        loginMethods: [
          "email",
          "sms",
          "wallet",
          "google",
          "github",
          "farcaster",
        ],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          requireUserPasswordOnCreate: false,
        },
        mfa: { noPromptOnMfaRequired: false },
      }}
      appId="clydhhyun0jnpecwk9sfqq4j1"
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <App />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  </React.StrictMode>
);
