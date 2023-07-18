import { useState, useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { addSubject } from '../../../ApiServices/Admin/Admin';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    getAllSubjectDetails: () => Promise<void>
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

const AddSubject: React.FC<Props> = ({ getAllSubjectDetails }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const textValueRef = useRef<HTMLInputElement | null>(null)
    const handleStateValue = async () => {
        const addSubjectValue = await addSubject(textValueRef?.current?.value)
        if (addSubjectValue.status === true) {
            getAllSubjectDetails()
            handleClose()
            toast.success('subject added successfully')
        } else {
            handleClose()
            toast.error('cant add this subject...')
        }
    }


    return (
        <div>

            <Button variant='outlined' onClick={handleOpen}>Add Subject</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Toaster
                        position="top-left"
                        reverseOrder={false}
                    />
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 700, padding: '1rem' }}>
                        Add Subject
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                            <Box>
                                <TextField label="Subject" variant="outlined" inputRef={textValueRef} fullWidth />
                            </Box>
                            <Button variant='contained' fullWidth sx={{ marginTop: '15px' }} onClick={handleStateValue}>Add</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default AddSubject