import axios from "axios";
const BASE_URL = "http://localhost:3000/api";
const instance = axios.create({
  baseURL: BASE_URL,
});

// export const addState = async () => {
//   try {
//     const response = await instance.get("/");
//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getOtp = async (name:string|undefined,email:string|undefined) => {
  try {
    const response = await instance.post("/sentotp",{name,email});
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const response = await instance.post("/verifyotp", { otp });
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const confirmTest = async (name:string|undefined,email:string|undefined,state:string,city:string,subject:string,time:string) => {
  try {
    const response = await instance.post("/confirmtest", { email,name,state,city,subject,time });
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const registerExam= async (name:string|undefined,email:string|undefined,state:string,city:string,subject:string,time:string)=>{
  try{
   const response= await instance.post('/registerexam',{name,email,state,city,subject,time})
   return response?.data
  }catch(err){
    console.log(err);
  }
}
