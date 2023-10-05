import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Udashboard.js';
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme'
import SignUp from './components/SignUp';
import Login from './components/Login';
import Landing from './components/Landing';
import {Routes,Route} from 'react-router-dom'
import  UserState  from './context/userState'
import AllExpenses from './components/AllExpenses';
import HomeDash from './components/HomeDash';
import AddExpense from './components/AddExpense';
import Budget from './components/Budget';
import Analyser from './components/Analyser';
import Report from './components/Report';



function App() {
  
  
  return (
    <>
    <UserState>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/userDash' element={<Dashboard/>}>
            <Route path='allExpenses' element={<AllExpenses/>}/>
            <Route path='home' element={<HomeDash/>}/>
            <Route path='addExpense' element={<AddExpense/>}/>
            <Route path='budgeting' element={<Budget/>}/>
            <Route path='expenseAnalyse' element={<Analyser/>}/>
            <Route path= 'report' element={<Report/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
      </UserState>
    </>
  );
}

export default App;
