import { createTheme } from "@mui/material";


const theme = createTheme({
    palette:{
        mode: "dark",
        primary:{
            dark:"#121212",
            light:'#717171',
            main:'#282828'
            
        },
        secondary: {
            main:'#7a5af5',
        },
        error: {main:'#e60b2c'},
        success:{main:'#32a852'}
    }

})


export default theme;