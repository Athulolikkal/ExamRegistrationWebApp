import { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SubjectDetailsType } from '../../../Types';
import { format } from 'date-fns';
import AddSubject from '../AddSubject/AddSubject';
import { addDateandTime } from '../../../ApiServices/Admin/Admin';
import toast, { Toaster } from 'react-hot-toast';


interface Props {
    subjectDetails?: SubjectDetailsType[];
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

const AddDateandTime: React.FC<Props> = ({ subjectDetails, getAllSubjectDetails }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const currentDate = format(new Date(), 'yyyy-MM-dd');

    const handleSubjectChange = (event: any) => {
        setSelectedSubject(event.target.value as string);
    };
    const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event?.target?.value)
    }
    const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
        setTime(event?.target?.value)
    }
    const handleAddDateAndTime = async () => {
        const isDateandTime = await addDateandTime(selectedSubject, time, date)
        if (isDateandTime?.status === true) {
            getAllSubjectDetails()
            handleClose()
            toast.success('item added successfully')
        } else {
            getAllSubjectDetails()
            handleClose()
            toast.error('failed to add item')
        }
    }
    return (
        <div>

            <Button variant='outlined' onClick={handleOpen}>Add Date & Time</Button>
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

                    <AddSubject getAllSubjectDetails={getAllSubjectDetails} />

                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 700, padding: '1rem' }}>
                        Add Date and Time
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                            <Box>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Subject</InputLabel>
                                    <Select label="Subject" value={selectedSubject} onChange={handleSubjectChange} >
                                        {subjectDetails?.map((item: SubjectDetailsType) => (
                                            <MenuItem value={item._id}>{item.subjectName}</MenuItem>
                                        ))

                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                                <TextField type='date' variant="outlined" fullWidth sx={{ paddingBottom: 1 }} inputProps={{ min: currentDate }} onChange={handleChangeDate} />
                                <TextField type='time' variant="outlined" fullWidth onChange={handleChangeTime} />
                            </Box>
                            <Button variant='contained' fullWidth sx={{ marginTop: '15px' }} onClick={handleAddDateAndTime} >Add</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default AddDateandTime