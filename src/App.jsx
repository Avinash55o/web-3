import { useState } from 'react';
import './App.css';
import { SolanaWallet } from './component/solanaWallet';
import { generateMnemonic } from 'bip39';
import { EthWallet } from './component/ETHWallet';

function App() {
  // Separate state for each wallet
  const [mnemonic, setMnemonic] = useState("");
  

  const handleClick = async () => {
    const mn = await generateMnemonic();
    const words=mn.split(" ")
    setMnemonic(words);
  };

  return (
    <>
      <button onClick={handleClick}>Create Seed Phrase</button>

      <div>
        <input type="text" value={mnemonic} readOnly />
      </div>

     

      {/* Pass mnemonics to respective wallet components */}
      <SolanaWallet />
      <EthWallet />
    </>
  );
}

export default App;
