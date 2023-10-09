import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Badge } from '@mui/material';
import {Link ,useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../context/userContext';
import Axios from 'axios'



function Navbar() {
    const navigate = useNavigate()
   
    const user = useContext(UserContext)

    // console.log(user.user);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const logOutUser = ()=>{
        setAnchorElUser(null);
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        user.setuser({
            isLogin: false,
            name: '',
            id: null
        })
        navigate('/')
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const paymentHandler = async (e) => {
        // console.log('payment started');
        e.preventDefault();
      
        const response = await Axios.get(`http://localhost:5000/subscribeToMembership/${user.user.id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        
        const options = {
          key: response.data.key_id,
          name: "Budgetbuddy",
          description: "Track and analyse your expense",
          order_id: response.data.order.id,
          handler: async (res) => {
            try {
             const captureResponse = await Axios.post('http://localhost:5000/succesPurchase', {
                order_id:response.data.order.id,
                uid:user.user.id
             },{
                headers:{
                    Authorization :localStorage.getItem('token')
                }
             })
             console.log(captureResponse.data);
             alert(captureResponse.data.msg)
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                      
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#f5ad42',
                            textDecoration: 'none',
                        }}
                    >
                        BudgetBuddy
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            
                                <MenuItem onClick={handleCloseNavMenu}>
                                <Link to='/'><Typography textAlign="center">Home</Typography></Link>
                                </MenuItem>

                                <MenuItem onClick={handleCloseNavMenu}>
                                <Link to='/login'><Typography textAlign="center">Login</Typography></Link>
                                </MenuItem>
                                <MenuItem onClick={paymentHandler}>
                                    Subcribe
                                </MenuItem>


                           
                        </Menu>
                    </Box>
                    
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#f5ad42',
                            textDecoration: 'none',
                        }}
                    >
                        BudgetBuddy
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                       
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                               <Link to='/'>Home</Link>
                            </Button>
                            {!user.user.isLogin ?<Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                               <Link to='/login'>Login</Link>
                            </Button>:<></>}
                            {user.user.isLogin && !user.user.isPremiumUser ?<Button
                                onClick={paymentHandler}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                              Subscribe
                            </Button>:<></>}
                        
                    </Box>
                    {user.user.isLogin ?
                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {user.user.isPremiumUser ?<Badge badgeContent='Prime' color='secondary'  anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                }}>
                                <Typography component='span' color='white' mr={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    {user.user.name}
                                </Typography>
                                </Badge>:
                                 <Typography component='span' color='white' mr={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                 {user.user.name}
                             </Typography>}
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            
                                <MenuItem  onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem  onClick={logOutUser}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                                <MenuItem >
                                    <Link to='/userDash/home'><Typography textAlign="center">Dashbord</Typography></Link>
                                </MenuItem>
                           
                        </Menu>
                    </Box>:<></>}
                </Toolbar>
            </Container>
        </AppBar>
    );

}
export default Navbar