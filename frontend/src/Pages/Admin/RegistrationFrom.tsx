import { useEffect, useState } from 'react'

import {BasicTable} from '../../Components/Admin/AddExam/AddExam'

import AddCity from '../../Components/Admin/AddCity/AddCity'
import AddDateandTime from '../../Components/Admin/AddDateandTime/AddDateandTime'
import { Box,Button,Typography} from '@mui/material'
import { getAllStates,getSubjectDetails,fetchAllRegistrations } from '../../ApiServices/Admin/Admin'
import { StateDetailsType,SubjectDetailsType,RegistrationType } from '../../Types'
import {useDispatch} from 'react-redux'
import { isLogOut } from '../../Redux/Admin/AdminTokenSlice'
import { useNavigate } from 'react-router-dom'

const RegistrationFrom = () => {
  const [stateDetails, setStateDetails] = useState<StateDetailsType[]>()
  const [subjectDetails,setSubjectDetails]= useState<SubjectDetailsType[]>()
  const [registrations,setAllregistrations] =useState<RegistrationType[]>()
  const dispatch= useDispatch()
  const navigate=useNavigate()

  const getAllStateDetails = async () => {
    const details = await getAllStates()
    setStateDetails(details)
  }

  const getAllSubjectDetails= async()=>{
     const details = await getSubjectDetails()
     setSubjectDetails(details)
  }

  const getAllRegistrations=async()=>{
   console.log('call comess');
  const allData= await fetchAllRegistrations()
  console.log(allData,'all data are');
  setAllregistrations(allData)
  }

  useEffect(() => {
    getAllStateDetails()
    getAllSubjectDetails()
    getAllRegistrations()
  }, [])
  
const logOut=()=>{
  localStorage.removeItem('accessToken')
  dispatch(isLogOut(''))
  // navigate('/admin/adminlogin')
}

  return (
    <div>
       <Box sx={{ width: '100%', backgroundColor: 'black', height: '4rem', display: 'flex', justifyContent: 'end' }}>
        <Button sx={{padding:2,color:'white'}} onClick={logOut}>logout</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'end', paddingTop: '5rem', paddingBottom: '1rem', gap: '1rem' }}>
        <AddCity stateDetails={stateDetails} getAllStateDetails={getAllStateDetails}/>
        <AddDateandTime subjectDetails={subjectDetails} getAllSubjectDetails={getAllSubjectDetails}/>
      </Box>
      <Typography variant='h4' sx={{textAlign:'center',padding:'2rem',fontWeight:700}}>All Registrations</Typography>
    <BasicTable registrations={registrations}/>
    </div>
  )
}

export default RegistrationFrom