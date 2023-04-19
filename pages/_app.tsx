import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider } from '@chakra-ui/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const http =
  'https://attentive-rough-shape.base-goerli.quiknode.pro/7467b3e15939f31d790570b1f83fd2de22177b56/';

const { chains, provider, webSocketProvider } = configureChains(
  [baseGoerli],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: () => ({
        http,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Oracle',
  projectId: '1',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

