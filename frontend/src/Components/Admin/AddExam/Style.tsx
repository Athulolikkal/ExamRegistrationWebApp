import { Box, styled } from '@mui/material';

export const CustomContainer = styled(Box)(() => ({
   display:'flex',
   flexDirection:'row',
   width:'100%',
}));

export const ContainerBox = styled(Box)(({theme})=>({
    width:'80%',
    [theme.breakpoints.down('sm')]: {
        width: "90%",
    },

}))
export const WrapperBox = styled(Box)(()=>({
    display:'flex',
    justifyContent:'center'

}))