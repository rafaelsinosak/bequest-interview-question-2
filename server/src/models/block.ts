import crypto from "crypto";

export class Block {
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;

  constructor(index: number, timestamp: string, data: any, previousHash: string = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
      .digest("hex");
  }
}
