import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserExamRegistrationForm from './Pages/User/UserExamRegistrationForm'
import AddExam from './Pages/Admin/RegistrationFrom'
import TestConfirm from './Components/User/SuccessPage/Success'
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './Redux/Admin/AdminTokenSlice';



function App() {
  const [token, setToken] = useState<string | undefined>('')
  const istoken = useSelector((state: any) => state.isToken)
  // console.log(user,'useeeerr');
  const dispatch=useDispatch()
  
  useEffect(() => {
    dispatch(addUser(istoken))
  }, [dispatch])


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<UserExamRegistrationForm />} />
          <Route path='/success' element={<TestConfirm />} />
          {istoken&&<Route path='/admin' element={<AddExam />} />}
          {istoken&&<Route path='/admin/login' element={<AddExam />} />}
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/login' element={<AddExam />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
