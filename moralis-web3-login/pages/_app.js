import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="2X8PHk5OUQUnlMQOa6wRTAHq3ppHSym6bUBjmv9a"
      serverUrl="https://9undhiaazjrj.usemoralis.com:2053/server"
    >
      {<Component {...pageProps} />}
    </MoralisProvider>
  );
}

export default MyApp;
