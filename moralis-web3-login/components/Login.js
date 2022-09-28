import styles from "../styles/Login.module.css";
import Image from "next/image";
import icon from "./Images/Moralis-Favicon.svg";
import { useMoralis } from "react-moralis";

function Login() {
  const { authenticate, authError, Moralis } = useMoralis();
  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId: "BKxP1cDxFwknu0GboZfDp9v7XUX2rDYRmREJSlAOzs5JgI1J4e7vQZHBkDgccmFTmjyEJjVPb7kXjTl8rVJP414",
    });
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <Image src={icon} width={100} height={100} alt="logo" />
        <div className={styles.sign_in_container}>
          {authError && (
            <p className={styles.error}>
              {authError.name}
              {authError.message}
            </p>
          )}
          <button onClick={handleCustomLogin}>Login with Moralis</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
