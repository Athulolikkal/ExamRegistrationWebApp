import { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { StateDetailsType } from '../../../Types';
import { addCity } from '../../../ApiServices/Admin/Admin';
import toast, { Toaster } from 'react-hot-toast';
import AddState from '../AddState/AddState';

interface Props {
    stateDetails?: StateDetailsType[];
    getAllStateDetails: () => Promise<void>;
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

const AddCity: React.FC<Props> = ({ stateDetails,getAllStateDetails }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedState, setSelectedState] = useState('');
    const [city, setCity] = useState('');

    const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleStateChange = (event: any) => {
        setSelectedState(event.target.value as string);
    };

    const handleAddCity = async () => {
        const toAddCity = await addCity(selectedState, city)
        if (toAddCity?.status === true) {
            handleClose()
            toast.success('city added successfully')
        } else {
            handleClose()
            toast.error('city already exists...!')
        }
    };


    return (
        <div>
      
            <Button variant='outlined' onClick={handleOpen}>Add City</Button>
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
                    <AddState getAllStateDetails={getAllStateDetails} />
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 700, padding: '1rem' }}>
                        Add City
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                            <Box>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>State</InputLabel>
                                    <Select label="State" value={selectedState} onChange={handleStateChange} >
                                        {
                                            stateDetails?.map((item) => (
                                                <MenuItem value={item?._id}>{item?.stateName}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                                <TextField label="City" variant="outlined" onChange={handleCityChange} fullWidth />
                            </Box>
                            <Button variant='contained' fullWidth sx={{ marginTop: '15px' }} onClick={handleAddCity} >Add</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default AddCity;
