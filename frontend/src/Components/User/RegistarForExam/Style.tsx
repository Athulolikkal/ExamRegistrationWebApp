import { TextField, Button, Box, Typography, styled } from '@mui/material';

export const CustomContainer = styled(Box)(({ theme }) => ({
    width: '80%',
    [theme.breakpoints.down('sm')]: {
        width: "90%",
    },
}));

export const FormWrapperBox=styled(Box)(()=>({
    display:'flex',
    justifyContent:'center'
}))