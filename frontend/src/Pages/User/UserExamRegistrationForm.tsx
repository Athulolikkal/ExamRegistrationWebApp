import { useEffect, useState } from 'react'
import UserExamRegistrationFrom from '../../Components/User/RegistarForExam/UserExamRegistrationForm'
import { Box } from '@mui/material'
import { getAllStates,getSubjectDetails } from '../../ApiServices/Admin/Admin'
import { StateDetailsType,SubjectDetailsType } from '../../Types'



const UserExamRegistrationForm = () => {
   const [stateDetails,setStateDetails]=useState<StateDetailsType[]>()
   const [subjectDetails,setSubjectDetails]=useState<SubjectDetailsType[]>()
   
   const getStateDetails=async()=>{
    const stateDetails= await getAllStates()
    setStateDetails(stateDetails)
   }

   const getAllSubjectDetails=async()=>{
    const subjectDetails=await getSubjectDetails()
    setSubjectDetails(subjectDetails)
    
   }
    useEffect(() => {
     getStateDetails()
     getAllSubjectDetails()
    }, [])
  
    return (
        <Box>
            <UserExamRegistrationFrom stateDetails={stateDetails} subjectDetails={subjectDetails}/>
        </Box>
    )
}

export default UserExamRegistrationForm