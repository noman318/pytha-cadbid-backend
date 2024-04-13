import { Router } from "express";
import StockSheetController from "../controller/stocks.controller";

const router = Router();

router.get("/", StockSheetController.testStocksController);
router.post("/create", StockSheetController.createStocksSheets);

export default router;
