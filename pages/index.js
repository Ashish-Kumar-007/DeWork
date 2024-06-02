import { Web3 } from "web3";
import { useEffect, useState } from "react";
import LoginPage from "./loginpage";

export default function Home() {
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    if (window && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);
  return (
    <div>
      <div>
        <title>DeWork</title>
        <link rel="icon" href="/favicon.ico" />
      </div>
      <LoginPage />
    </div>
  );
}
