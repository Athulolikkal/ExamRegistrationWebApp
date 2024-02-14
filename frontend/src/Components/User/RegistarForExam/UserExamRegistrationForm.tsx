import React, { useState, useEffect, useRef } from 'react'
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { CustomContainer, FormWrapperBox } from './Style';
import { StateDetailsType, SubjectDetailsType } from '../../../Types';
import { getOtp, registerExam, confirmTest } from '../../../ApiServices/User/User'
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Props {
  stateDetails?: StateDetailsType[];
  subjectDetails?: SubjectDetailsType[]
}

interface formValues {
  Name: string;
  Email: string;
  State: string;
  City: string;
  Subject: string;
  DateandTime: string;
}

const UserLogin: React.FC<Props> = ({ stateDetails, subjectDetails }) => {
  const [state, setState] = useState('')
  const [city, setCity] = useState<string[]>()
  const [selectedCity, setSelectedCity] = useState("")
  const [subject, setSubject] = useState<string>('')
  const [time, setTime] = useState<string[]>()
  const [selectedTime, setSelectedTime] = useState('')
  const [verified, setVerified] = useState<boolean>(false)
  const [Loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState<string>('');
  const [sentedOtp, setSentedOtp] = useState<string>('')
  const [remainingTime, setRemainingTime] = useState(60);
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const navigate =useNavigate()
  const recaptchId=import.meta.env.VITE_RECAPTCHA_ID
  
  const form = useForm<formValues>()
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (remainingTime > 0 && openModal) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (remainingTime === 0) {
      handleCloseModal();
    }
  }, [remainingTime, openModal]);

  const onSubmit: SubmitHandler<formValues> = async (data) => {
    if (state && selectedCity && subject && selectedTime) {
      setLoading(true)
      const name = nameRef?.current?.value
      const email = emailRef?.current?.value
      const response = await getOtp(name, email)
      if (response?.status === true) {
        setLoading(false)
        setSentedOtp(response?.otp)
        handleOtpSent();
        toast.success('otp sented successfully....check your email')


      } else {
        setLoading(false)
        toast.error('please try again later..................')

      }
    } else {
      toast.error('select all feilds.........')
    }

  };
  const handleStateChange = (e: any) => {
    const selectedState = e?.target?.value as string;
    setState(selectedState);
    const selectedData = stateDetails?.find((item: any) => item?.stateName === selectedState)
    setCity(selectedData ? selectedData?.city : [])
    setSelectedCity('')
  };

  const handleChangeCity = (e: any) => {
    const selectedState = e?.target?.value as string;
    setSelectedCity(selectedState)
  }

  const changeTimeDetail = (e: any) => {
    const selectedState = e?.target?.value as string;
    setSelectedTime(selectedState)
  }

  const handleSubjectChange = (e: any) => {
    const selectedSubject = e?.target?.value as string;
    setSubject(selectedSubject);
    const selectedData = subjectDetails?.find((item: any) => item?.subjectName === selectedSubject)
    setTime(selectedData ? selectedData?.dateAndTime : [])
    setSelectedTime('')
  }
  const handleRecaptcha = (e: any) => {
    setVerified(true)
  }
  const handleOtpSent = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const otpVerification = async () => {
    if (sentedOtp === otp) {
      handleCloseModal()
      setRemainingTime(60)
      setOtp('')
      await toast.success('otp verified successfully')
      const name = nameRef?.current?.value
      const email = emailRef?.current?.value
      const response = await registerExam(name, email, state, selectedCity, subject, selectedTime)
      if (response?.status === true) {
        toast.success(response?.message)
        setLoading(true)
        const isConfirm = await confirmTest(name, email, state, selectedCity, subject, selectedTime)
        if (isConfirm?.status === true) {
         
          await toast.success('confirmation mail is sented to your registred email......')
          setLoading(false)
         
          setTimeout(()=>{
            navigate('/success')
          },1000)
         
        }
        else {
          setLoading(false)
          toast.error('something went wrong........faild to sent confirmation to your email')
        }
      } else {
        toast.error(response?.message)
      }

    } else {
      setRemainingTime(60)
      setOtp('')
      handleCloseModal()
      toast.error('otp verification faild')
    }
  }


  return (
    <Box >
      <Toaster
        position="top-left"
        reverseOrder={false}
      />

      {/*---------------------- modal-starts---------------------- */}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Verify OTP</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600, marginTop: '1rem' }}>
            Remaining Time: {remainingTime} seconds
          </Typography>
        </DialogContent>

        <DialogContent>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button color="primary" onClick={otpVerification} >Verify</Button>
        </DialogActions>
      </Dialog>
      {/*--------------- modal-ends------------ */}

      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
        {Loading ? <Typography variant='body2' sx={{ textAlign: 'start', fontWeight: 600, marginLeft: '10%', marginTop: '1rem' }}>Waiting for Otp........</Typography> : ''}
        <Box sx={{ padding: '2rem', marginTop: '4rem' }}>
          <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 700 }}>Registeration Form</Typography>
          <Typography variant='body1' sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: '5px', color: "#A8A196" }}>students can regiter here for there exams!</Typography>
        </Box>
        < FormWrapperBox>
          <CustomContainer >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField label="Name"
                    variant="outlined"
                    inputRef={nameRef}
                    fullWidth
                    {...register('Name', {
                      required: 'name is required',
                      pattern: {
                        value: /^(?!\s)[A-Za-z\s'-]+$/,
                        message: 'only accept letters'
                      },
                      minLength: {
                        value: 3,
                        message: 'Name must be at least 3 characters long',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Name cannot exceed 30 characters',
                      },
                      validate: (value) => !value.startsWith(' ') ||
                        "can't start with white spaces"
                    })}
                    error={!!errors.Name}
                    helperText={errors?.Name?.message} />

                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField label="Email"
                    variant="outlined"
                    inputRef={emailRef}
                    fullWidth

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
                <Grid item xs={12} sm={6}>

                  <FormControl variant="outlined" fullWidth >
                    <InputLabel>State</InputLabel>
                    <Select label="State" onChange={handleStateChange}>
                      {stateDetails?.map((item) => (
                        <MenuItem key={item?.stateName} value={item?.stateName}>
                          {item?.stateName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select label="City" onChange={handleChangeCity}>

                      {city?.map((item) => (<MenuItem value={item}>{item}</MenuItem>))}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Subject</InputLabel>
                    <Select label="Subject" onChange={handleSubjectChange}>
                      {subjectDetails?.map((item) => (<MenuItem value={item?.subjectName} key={item?.subjectName}>{item?.subjectName}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Date and Time</InputLabel>
                    <Select label="DateandTime" onChange={changeTimeDetail}>

                      {time?.map((timedetail) => <MenuItem value={timedetail}>{timedetail}</MenuItem>)}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReCAPTCHA
                    
                    sitekey={recaptchId}
                    onChange={handleRecaptcha}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined" color="primary" sx={{ width: '100%', height: '3rem' }} disabled={!verified}>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CustomContainer>
        </FormWrapperBox>


      </Box>
    </Box>
  )
}

export default UserLogin
