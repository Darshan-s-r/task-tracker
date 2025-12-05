import express from "express";

const router = express.Router();

import { validateAIInput } from "../validators/aiInput.js";
import { handleValidationErrors } from "../validators/index.js";
import { extractdata } from "../controllers/aiExtract.js";

router.post("/extract-data", validateAIInput, handleValidationErrors, extractdata);

export default router;