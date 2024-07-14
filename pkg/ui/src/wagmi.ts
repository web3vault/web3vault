import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({ projectId: "0ad97be72d18e33bf2f715da7a4f602a" }),
  ],
  transports: {
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
