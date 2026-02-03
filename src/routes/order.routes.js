import { Router } from "express";
import orderController from "../controllers/order.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/orders', (req, res) => orderController.getAll(req, res))
router.get('/orders/:id', (req, res) => orderController.getById(req, res))
router.post('/orders', authMiddleware, (req, res) => orderController.create(req, res))
router.patch('/orders/:id/status', authMiddleware, (req, res) => orderController.updateStatus(req,res))
router.delete('/orders/:id', authMiddleware, (req,res) => orderController.delete(req, res))

export default router