import { Router } from "express";
import { BlockchainController } from "../controllers/blockchainController";

const router = Router();

router.get("/", BlockchainController.getData);
router.post("/", BlockchainController.addData);
router.get("/verify", BlockchainController.verifyChain);
router.post("/restore", BlockchainController.restoreData);
router.post("/tamper", BlockchainController.tamperData);

export default router;
