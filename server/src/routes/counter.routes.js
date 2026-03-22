import express from "express" 
import { deleteCounter, getCounter } from "../controllers/counter.controller.js"
const router = express()

router.get("/" , getCounter)
router.delete("/" , deleteCounter)

export default router