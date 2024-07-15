import { Blockchain } from "../models/blockchain";
import { Block } from "../models/block";
import cron from "node-cron";

export class BlockchainService {
  private blockchain: Blockchain;
  private database: { data: string };

  constructor() {
    this.blockchain = new Blockchain();
    this.database = { data: "Hello World" };

    // Schedule a cron task to check blockchain integrity every hour
    cron.schedule("0 * * * *", () => {
      console.log("Verificando a integridade da blockchain...");
      const isValid = this.blockchain.isChainValid();
      if (isValid) {
        console.log("Blockchain está íntegra.");
      } else {
        console.log("Blockchain foi corrompida.");
      }
    });
  }

  getData() {
    return this.database.data;
  }

  addData(data: any) {
    const newBlock = new Block(
      this.blockchain.chain.length,
      new Date().toISOString(),
      data,
      this.blockchain.getLatestBlock().hash
    );

    this.blockchain.addBlock(newBlock);
    this.database.data = data;
  }

  verifyChain() {
    return this.blockchain.isChainValid();
  }

  restoreData() {
    const genesisBlock = this.blockchain.chain[0];
    this.database.data = genesisBlock.data;
    return genesisBlock.data;
  }

  tamperData() {
    const chainLength = this.blockchain.chain.length;
    if (chainLength > 1) {
      this.blockchain.chain[chainLength - 1].data = "Tampered Data";
    }
  }
}

export const blockchainService = new BlockchainService();
