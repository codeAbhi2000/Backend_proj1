import { useState } from "react";
import UserContext from './userContext'


const UserState = (props)=>{
    const [user, setuser] = useState({
        isLogin: false,
        name:'',
        id:null
    })
    function update(isLogin,name,id) {
        setuser({
            isLogin:isLogin,
            name:name,
            id:id
        })
    }
    return(
        <UserContext.Provider value={{user,update}}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState;