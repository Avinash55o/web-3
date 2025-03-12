//blockchain structure
class Block{
    constructor(index, previousHash, timestamp, data, hash){
        this.index = index;
        this.previousHash= previousHash;
        this.timestamp= timestamp;
        this.data= data;
        this.hash=hash;
        this.nonce = 0;
    }
}

//hashing
const crypto =require('crypto');

function calculateHash(index, previousHash, timestamp, data, nonce){
    return crypto.createHash('sha256').update(index + previousHash + timestamp + JSON.stringify(data) + nonce).digest('hex');
}

//proof of work
function mineBlock(block, difficulty){
    while(block.hash.substring(0,difficulty)!== Array(difficulty + 1).join("0")){
        block.nonce++;
        block.hash=calculateHash(block.index,block.previousHash,block.timestamp,block.data,block.nonce);
    }
    console.log("Block mined:"+block.hash);
}

//consensus algorithm
function isChainValid(blockchain){
    for(let i=1;i<blockchain.length;i++){
        const currentBlock=blockchain[i];
        const previousBlock=blockchain[i - 1];
        if (currentBlock.hash !==calculateHash(currentBlock.index,currentBlock.previousHash,currentBlock.timestamp,currentBlock.data,currentBlock.nonce)){
            return false;
        }
        if (currentBlock.previousHash !== previousBlock.hash){
            return false;
        }
    }
    return true;
}

// blockchain
class Blockchain{
    constructor(){
        this.chain=[];
        this.difficulty=2;
        this.createGenesisBlock();
    }
    createGenesisBlock(){
        const genesisBlock=new Block(0,"0",new Date().toISOString(),"Genesis Block","0");
        mineBlock(genesisBlock,this.difficulty);
        this.chain.push(genesisBlock);
    }
    addBlock(data){
        const previousBlock=this.chain[this.chain.length - 1];
        const index=previousBlock.index + 1;
        const timestamp=new Date().toISOString();
        const hash=calculateHash(index,previousBlock.hash,timestamp,data,0);
        const newBlock=new Block(index,previousBlock.hash,timestamp,data,hash);
        mineBlock(newBlock,this.difficulty);
        this.chain.push(newBlock);
    }
}

//example usage
const blockchain=new Blockchain();
blockchain.addBlock({amount:4});
blockchain.addBlock({amount:8});

console.log(JSON.stringify(blockchain,null,2));

if (isChainValid(blockchain.chain)){
    console.log("Blockchain is valid.");
} else {
    console.log("Blockchain is not valid.");
}