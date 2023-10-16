import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Udashboard.js';
import {  ThemeProvider} from '@mui/material';
import theme from './assets/theme'
import SignUp from './components/SignUp';
import Login from './components/Login';
import Landing from './components/Landing';
import {Routes,Route,} from 'react-router-dom'
import AllExpenses from './components/AllExpenses';
import HomeDash from './components/HomeDash';
import AddExpense from './components/AddExpense';
import Budget from './components/Budget';
import Analyser from './components/Analyser';
import Report from './components/Report';
import ErrorNotice from './components/ErrorNotice';
import ForgotPass from './components/ForgotPass';
import ResetPass from './components/ResetPass';
import Downloads from './components/Downloads';



function App() {
  
  
 
  return (
    <>
   
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/forgotPassword' element={<ForgotPass/>}/>
          <Route path='/resetPassword/:uid/:token' element={<ResetPass/>}/>
          <Route path='/userDash' element={<Dashboard/>}>
            <Route path='allExpenses' element={<AllExpenses/>}/>
            <Route path='home' element={<HomeDash/>}/>
            <Route path='addExpense' element={<AddExpense/>}/>
            <Route path='budgeting' element={<Budget/>}/>
            <Route path='expenseAnalyse' element={<Analyser/>}/>
            <Route path= 'report' element={<Report/>}/>
            <Route path='downloads' element={<Downloads/>}/>
            <Route path='notice' element={<ErrorNotice value={'This is a premium Feature Please buy a subscription To use it'}/>}/>
           </Route>
        </Routes>
      </ThemeProvider>
      
    </>
  );
}

export default App;
