import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount,setamount]=useState("")

  const sendAirdrop = async () => {
    if(!wallet.publicKey){
        alert("please connect your wallet first!")
    }

    const solAmount=Number(amount)
    try {
        await connection.requestAirdrop(wallet.publicKey, solAmount * LAMPORTS_PER_SOL );
    alert("sol is airdrop");
    } catch (error) {
        console.error("Airdrop failed:", error);
        alert("Failed to request airdrop.");
    }
  };

  return (
    <div>
      <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setamount(e.target.value)}/>
      <button onClick={sendAirdrop}>Request Airdrop</button>
    </div>
  );
}
