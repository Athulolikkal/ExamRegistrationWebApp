import axios from "axios";
const BASE_URL = "http://localhost:3000/api/admin";
const instance = axios.create({
  baseURL: BASE_URL,
});

export const addState = async (value: string | undefined) => {
  try {
    const response = await instance.post("/addstate", { value });
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const addSubject = async (value: string | undefined) => {
  try {
    const response = await instance.post("/addsubject", { value });
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllStates = async () => {
  try {
    const getAllStates = await instance.get("/getallstate");
    return getAllStates?.data;
  } catch (err) {
    console.log(err);
  }
};

export const addCity = async (
  selectedState: string | undefined,
  city: string | undefined
) => {
  try {
    const addCity = await instance.post("/addcity", { selectedState, city });
    return addCity?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSubjectDetails = async () => {
  try {
    const subjectDetails = await instance.get("/getsubjectdetails");
    return subjectDetails?.data;
  } catch (err) {
    console.log(err);
  }
};

export const addDateandTime = async (
  subjectId: string,
  date: string,
  time: string
) => {
  try {
    console.log(subjectId, date, time);
    const toAddDateAndTime = await instance.post("/adddateandtime", {
      subjectId,
      date,
      time,
    });
    return toAddDateAndTime?.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllRegistrations=async()=>{
  try{
    console.log('call is comes');
    const getAllRegistrations = await instance.get('/allregistrations')
   console.log(getAllRegistrations?.data,'data is');
    return getAllRegistrations?.data
  }catch(err){
    console.log(err);
  }
}

export const AdminLogin=async(email:string|undefined,password:string|undefined)=>{
  try{
   const toAdminLogin= await instance.post('/adminlogin',{email,password})
   return toAdminLogin?.data
  }catch(err){
    console.log(err);
  }
}