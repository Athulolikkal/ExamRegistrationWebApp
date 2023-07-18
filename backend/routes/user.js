import express from 'express'
const router=express.Router()
import userController from '../controllers/userControllers.js'

router.post('/sentotp',userController.sentOtpToEmail)
router.post('/verifyotp',userController.verifyOtp)
router.post('/registerexam',userController.registerExam)
router.post('/confirmtest',userController.confirmTestByEmail)
export default router;
