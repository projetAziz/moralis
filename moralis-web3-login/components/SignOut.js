import { useMoralis } from "react-moralis";
import signOutStyle from "../styles/SignOut.module.css";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import axios from "axios";

export const SignOut = () => {
  const { logout, Moralis, user, account } = useMoralis();
  const [usersInfo, setUserInfo] = useState([]);
  const [balance, setBalance] = useState(0);
  //Initialize within your constructor
  const web3auth = new Web3Auth({
    clientId: "2X8PHk5OUQUnlMQOa6wRTAHq3ppHSym6bUBjmv9a", // Get your Client ID from Web3Auth Dashboard
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x1",
    },
  });
  const fetchBalance = async () => {
    try {
      const options = { chain: Moralis.Chains.ETH_ROPSTEN };
      const balance = await Moralis.Web3API.account.getNativeBalance(options);
      setBalance(balance.balance / 10 ** 18);
    } catch {}
    await web3auth.initModal();
    await web3auth.connect();
    const userWithEmail = await web3auth.getUserInfo();
    console.log("User info", userWithEmail);
    setUserInfo(userWithEmail);
    axios.post("http://localhost:3001/insert", {
      aggregateVerifier: userWithEmail.aggregateVerifier,
      email: userWithEmail.email,
      name: userWithEmail.name,
      profileImage: userWithEmail.profileImage,
      typeOfLogin: userWithEmail.typeOfLogin,
      verifierId: userWithEmail.verifierId,
    });

    await web3auth.logout();
  };
  useEffect(() => {
    fetchBalance();
  }, []);

  const handleTransfer = async () => {
    try {
      await Moralis.transfer({
        amount: Moralis.Units.ETH("0.1"),
        receiver: "0xd2305b8155c4710c7fff1358d084f23959c999f3",
        type: "native",
      }).then((e) => {
        alert("sucesfully transfered");
      });
      await fetchBalance();
    } catch {}
  };

  return (
    <div className={signOutStyle.signOut_container}>
      <div className={signOutStyle.signOutCard}>
        <h4>Welcome To Moralis x Web3Auth!</h4>
        <button className={`${signOutStyle.refresh}`} onClick={fetchBalance}>
          Refresh
        </button>
        <p className={signOutStyle.subHeader}>Details:</p>

        <div className={signOutStyle.detailsDiv}>
          <div>
            <h5>Account:</h5>
            <p>{user.attributes.accounts}</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <h2>User sign in with email</h2>
            <p>{usersInfo.email}</p>
          </div>
          <div>
            <h5>Balance (Eth)</h5>
            <p>{balance} </p>
          </div>
        </div>

        <div className={signOutStyle.fotter}>
          <button className={styles.loginButton} onClick={handleTransfer}>
            Test Transfer
          </button>
          <button className={styles.loginButton} onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
