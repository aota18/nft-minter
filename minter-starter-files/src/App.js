import MyRouts from "./routers/routes";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import Web3 from "web3";

function App() {
  const { enableWeb3 } = useMoralis();
  useEffect(() => {
    enableWeb3();
  }, []);

  return (
    <div className="App">
      <MyRouts />
    </div>
  );
}

export default App;
