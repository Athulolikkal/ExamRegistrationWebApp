import { useState,useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import {addState} from '../../../ApiServices/Admin/Admin'
import toast, { Toaster } from 'react-hot-toast';

interface Props{
    getAllStateDetails:() => Promise<void>
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddState:React.FC<Props> = ({getAllStateDetails}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const textValueRef=useRef<HTMLInputElement | null>(null)
   
    const handleStateValue=async()=>{
       const isStateAdd= await addState(textValueRef?.current?.value)
       if(isStateAdd.status===true){
        getAllStateDetails()
        handleClose()
        toast.success('state added successfully')
       }else{
        handleClose()
        toast.error('cant add this state..')
       }
   
    }
    return (
        <div>
            <Toaster
          position="top-left"
          reverseOrder={false}
        />
            <Button variant='outlined' onClick={handleOpen}>Add State</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 700,padding:'1rem' }}>
                        Add State
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center',width:'100%'}}>
                        <Box sx={{width:'100%'}}>
                            <Box>
                                <TextField label="State" variant="outlined" inputRef={textValueRef} fullWidth/>
                            </Box>
                            <Button variant='contained' fullWidth sx={{marginTop:'15px'}} onClick={handleStateValue}>Add</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default AddState