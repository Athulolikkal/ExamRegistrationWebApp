import React from 'react'
import successicon from '../../../assets/Confirmed-pana.png'
import { Box,Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Success = () => {
 const navigate = useNavigate()
    return (
    <div >
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <img src={successicon} alt='successicon' style={{width:'40%',height:'40%'}}/>
        </Box>
      <Box sx={{display:'flex',justifyContent:'center'}}>
        <Button variant='outlined' onClick={()=>navigate('/')}>Back to Register</Button>
      </Box>
       
    </div>
  )
}

export default Success