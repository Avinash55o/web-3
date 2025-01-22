import { useState } from 'react'
import './App.css'
import { SolanaWallet } from './component/solanaWallet';
import { generateMnemonic } from 'bip39'
import { EthWallet } from './component/ETHWallet';
function App() {
  const [mnemonic, setMnemonic]=useState("");
  const handleClick=async()=>{
   const mn=await generateMnemonic();
   setMnemonic(mn)
  }

  return (
    <>
      <button onClick={handleClick}>
        create seed phrase
      </button>
      <input type="text" value={mnemonic} />
      <SolanaWallet/>
      <EthWallet/>

    </>
  )
}

export default App
