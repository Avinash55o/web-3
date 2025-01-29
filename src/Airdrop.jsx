import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const sendAirdrop = async () => {
    const Ammount=document.getElementById("ammount").value
    await connection.requestAirdrop(wallet.publicKey,Ammount * LAMPORTS_PER_SOL );
    alert("airdrop the sol");
  };

  return (
    <div>
      <input id="ammount" type="text" placeholder="Amount" />
      <button onClick={sendAirdrop}>send Airdrop</button>
    </div>
  );
}
