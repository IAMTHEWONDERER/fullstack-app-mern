import express from 'express';
const router = express.Router();
import {deleteUser} from '../../controller/userController.js';



router.delete("/delete/:id", deleteUser)

export default router;