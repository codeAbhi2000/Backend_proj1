import { useState } from "react";
import UserContext from './userContext'
import Axios from "axios";



const UserState = (props) => {
    const [user, setuser] = useState({
        isLogin: false,
        isPremiumUser: false,
        name: '',
        id: null,
        email: '',
        budget: null,
        total_expense: null,
        income: null
    })

    const updateUser = () => {
        Axios.get(`http://localhost:5000/getAllUserDetails/${user.email}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            // console.log(res.data.data);
            localStorage.setItem('user', JSON.stringify([...res.data.data[0], ...res.data.data[1], ...res.data.data[2]]))
        }).catch(err => console.log(err))

        const logedUser = JSON.parse(localStorage.getItem('user'))
        // console.log(logedUser);
        if (logedUser.length === 3)
        {

            setuser({ isLogin: true, isPremiumUser: logedUser[0].ispremiumuser, name: logedUser[0].name, id: logedUser[0].id, email: logedUser[0].email, budget: logedUser[2].budget, total_expense: logedUser[1].total_expense, income: logedUser[2].income })
        }
        else if (logedUser.length === 2)
        {
            setuser({ isLogin: true, isPremiumUser: logedUser[0].ispremiumuser, name: logedUser[0].name, id: logedUser[0].id, email: logedUser[0].email, budget: 0, total_expense: logedUser[1].total_expense, income: 0 })
        }
        else
        {
            setuser({ isLogin: true, isPremiumUser: logedUser[0].ispremiumuser, name: logedUser[0].name, id: logedUser[0].id, email: logedUser[0].email, budget: 0, total_expense: 0, income: 0 })
        }
    }

    const upDateLocalUser = () => {
        const logedUser = JSON.parse(localStorage.getItem('user'))
        if (logedUser.length === 3)
        {

            setuser({ isLogin: true, isPremiumUser: logedUser[0].ispremiumuser, name: logedUser[0].name, id: logedUser[0].id, email: logedUser[0].email, budget: logedUser[2].budget, total_expense: logedUser[1].total_expense, income: logedUser[2].income })
        }
        else if (logedUser.length === 2)
        {
            setuser({ isLogin: true, isPremiumUser: logedUser[0].ispremiumuser, name: logedUser[0].name, id: logedUser[0].id, email: logedUser[0].email, budget: 0, total_expense: logedUser[1].total_expense, income: 0 })
        }
        else
        {
            setuser({ isLogin: true, isPremiumUser: logedUser[0].ispremiumuser, name: logedUser[0].name, id: logedUser[0].id, email: logedUser[0].email, budget: 0, total_expense: 0, income: 0 })
        }


    }

    return (
        <UserContext.Provider value={{ user, setuser, updateUser, upDateLocalUser }}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState;