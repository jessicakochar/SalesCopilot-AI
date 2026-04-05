import express from "express";
import { createSale, getSales, deleteSale, updateSale, getSaleById, importSalesFromCSV} from "../controllers/sales.controller.js";
import { upload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.use(verifyToken);

router.post("/import", upload.single("file"), importSalesFromCSV);
router.get("/", getSales);
router.delete("/:id", deleteSale);
router.get("/:id", getSaleById);
router.post("/", createSale);
router.put("/:id", updateSale   );

export default router;