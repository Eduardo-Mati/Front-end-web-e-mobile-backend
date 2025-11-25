import express from 'express';
import userController from '../controllers/user-controller.js';
const router = express.Router();



router.route('/:id')
.delete(userController.deleteOne)
.get(userController.getOne)
.put(userController.updateOne)

router.route('/')
.get(userController.getAll)

router.route('/login')
.post(userController.login)

router.route('/register')
.post(userController.create)

export default router;
