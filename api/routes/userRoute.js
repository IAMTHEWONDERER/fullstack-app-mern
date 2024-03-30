import express from 'express';
const router = express.Router();
import {deleteUser} from '../../controller/userController.js';
import {verifyToken} from'../middleware/jwt.js';



router.delete("/delete/:id",verifyToken, deleteUser)

export default router;