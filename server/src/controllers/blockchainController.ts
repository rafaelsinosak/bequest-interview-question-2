import { Request, Response } from "express";
import { blockchainService } from "../services/blockchainService";

export class BlockchainController {
  static getData(req: Request, res: Response) {
    const data = blockchainService.getData();
    res.json({ data });
  }

  static addData(req: Request, res: Response) {
    blockchainService.addData(req.body.data);
    res.sendStatus(200);
  }

  static verifyChain(req: Request, res: Response) {
    const isValid = blockchainService.verifyChain();
    res.json({ isValid });
  }

  static restoreData(req: Request, res: Response) {
    const data = blockchainService.restoreData();
    res.json({ data });
  }

  static tamperData(req: Request, res: Response) {
    blockchainService.tamperData();
    res.sendStatus(200);
  }
}
