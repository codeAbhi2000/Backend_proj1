import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Udashboard.js';
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme'
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        {/* <Dashboard/> */}
        <SignUp/>
      </ThemeProvider>
      
    </>
  );
}

export default App;
