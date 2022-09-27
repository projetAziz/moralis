import Login from "../components/Login";
import styles from "../styles/Login.module.css";
import { useMoralis } from "react-moralis";
import { SignOut } from "../components/SignOut";

export default function Home() {
  const { isAuthenticated } = useMoralis();
  return <>{isAuthenticated ? <SignOut /> : <Login />}</>;
}
