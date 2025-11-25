import express from 'express';
import productController from '../controllers/product-controller.js';
const router = express.Router();



router.route('/:id')
.delete(productController.deleteOne)
.get(productController.getOne)
.put(productController.updateOne)

router.route('/')
.get(productController.getAll)

router.route('/create')
.post(productController.create)



export default router;
