import { Router } from "express";


const router = Router()

// Routing
router.get("/", (req,res) => {
res.send("Desde Get")
})
router.post("/", (req,res) => {
res.send("Desde Post")
})
router.put("/", (req,res) => {
res.send("Desde Put")
})
router.delete("/", (req,res) => {
res.send("Desde Delete")
})


export default router