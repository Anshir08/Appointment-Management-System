import {Router} from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { registerPatient, loginUser, logoutUser, getAllDoctors, getSingleDoctor, getMyProfile, updateDoctorAvailability } from '../controllers/auth.js';

const router = Router();

router.post('/register', registerPatient);

router.post('/login', loginUser);

router.get('/logout', isAuthenticated, logoutUser);

router.get('/me', isAuthenticated, getMyProfile);

router.get('/doctors', getAllDoctors);

router.get('/doctors/:id', getSingleDoctor);

router.put('/doctors/:id', updateDoctorAvailability);


export default router;