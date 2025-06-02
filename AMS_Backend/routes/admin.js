import {Router} from 'express';
import { createDoctor, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/admin.js';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';

const router = Router();

// get all users filter by role
router.get('/users', isAuthenticated, isAuthorized('admin'), getAllUsers);

router.get('/users/:id', isAuthenticated, isAuthorized('admin'), getUserById);

router.put('/users/:id', isAuthenticated, isAuthorized('admin'), updateUserById);

router.delete('/users/:id', isAuthenticated, isAuthorized('admin'), deleteUserById);

router.post('/doctor', isAuthenticated, isAuthorized('admin'), createDoctor);


export default router;