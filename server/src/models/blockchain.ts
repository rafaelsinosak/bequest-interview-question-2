import { Block } from "./block";

export class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "2023-01-01", "Hello World", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`Block ${currentBlock.index} has been tampered.`);
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(`Block ${currentBlock.index} is not linked to the previous block correctly.`);
        return false;
      }
    }
    return true;
  }
}
