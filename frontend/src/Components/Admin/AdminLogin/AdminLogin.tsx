import { useState } from 'react'
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AdminLogin } from '../../../ApiServices/Admin/Admin'
import toast, { Toaster } from 'react-hot-toast';
import sideIcone from '../../../assets/My password-amico.png'
import { useDispatch } from 'react-redux';
import { addUser } from '../../../Redux/Admin/AdminTokenSlice';

type formValues = {
    Email: string,
    Password: string,

}
const CanteenLogin = () => {
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const navigate = useNavigate()
    const handlePassVisibility = () => {
        setViewPassword((prev) => !prev);
    };

   const dispatch= useDispatch()

    //useForm attributes
    const form = useForm<formValues>()
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit: SubmitHandler<formValues> = async(data) => {
        console.log('submitted');
    const isAdminLogged=await AdminLogin(data?.Email,data?.Password)
    if(isAdminLogged?.status===true){
       localStorage.setItem('accessToken',isAdminLogged?.accessToken)
        toast.success('successfully loged in...... ')
        dispatch(addUser(isAdminLogged?.accessToken))
        navigate('/admin')

    }else{
        toast.error(isAdminLogged?.message)
    }
    };


    return (
        <div>
            <Container maxWidth="md">
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />

                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item md={6} xs={12}>
                        <Paper elevation={0} sx={{ padding: 5 }}>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Grid container direction="column" spacing={2}>

                                    <Typography variant='h5' style={{ fontWeight: 'bold', textAlign: 'center', color: "#4B6190" }}>Admin Login </Typography>

                                    <Typography style={{ textAlign: 'center', color: "#8F95A2", fontSize: '14px', paddingTop: '6px' }}>Admin can login with their credentials!</Typography>




                                    <Grid item>
                                        <TextField
                                            type="Email"
                                            fullWidth
                                            label="Email"
                                            placeholder="Email address"
                                            variant="standard"
                                            color="secondary"
                                            size='small'
                                            {...register('Email', {
                                                required: 'email is required',
                                                pattern: {
                                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                                    message: 'Please enter a valid email address',
                                                }
                                            })}
                                            error={!!errors.Email}
                                            helperText={errors?.Email?.message}
                                        />
                                    </Grid>




                                    <Grid item>
                                        <TextField
                                            type={viewPassword ? 'text' : 'password'}
                                            fullWidth
                                            label="Password"
                                            placeholder="Enter the password"
                                            variant="standard"
                                            color="secondary"

                                            size='small'
                                            {...register('Password', {
                                                required: 'confirm your password',
                                            })}
                                            error={!!errors.Password}


                                            helperText={errors.Password ? errors.Password?.message : 'dont share the password'}

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handlePassVisibility}
                                                            aria-label="password"
                                                            edge="end"
                                                        >
                                                            {viewPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Button type='submit' variant="contained" fullWidth size="large">
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                        <img
                            className="rounded-2xl"

                            src={sideIcone}
                            alt="canteenPro"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}

export default CanteenLogin