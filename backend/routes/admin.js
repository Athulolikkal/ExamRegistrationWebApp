import express from 'express';
const router=express.Router()
import adminControllers from '../controllers/adminControllers.js';

router.post('/addstate',adminControllers.addExamState)
router.post('/addsubject',adminControllers.addExamSubject)
router.get('/getallstate',adminControllers.getAllStateDetails)
router.post('/addcity',adminControllers.addCity)
router.get('/getsubjectdetails',adminControllers.getSubjectDetails)
router.post('/adddateandtime',adminControllers.toAddDateAndTime)
router.get('/allregistrations',adminControllers.getAllRegistrations)
router.post('/adminlogin',adminControllers.toAdminLogin)
export default router