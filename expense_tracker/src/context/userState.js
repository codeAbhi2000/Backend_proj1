import { useState } from "react";
import UserContext from "./userContext";
import Axios from "axios";

const UserState = (props) => {
  const [user, setuser] = useState({
    isLogin: false,
    isPremiumUser: false,
    name: "",
    id: null,
    email: "",
    budget: null,
    total_expense: null,
    income: null,
  });

  const updateUser = () => {
    Axios.get(`http://localhost:5000/getAllUserDetails/${user.email}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        // console.log(res.data.data);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...res.data.data
          })
        );
      })
      .catch((err) => console.log(err));

    const logedUser = JSON.parse(localStorage.getItem("user"));
    console.log(logedUser);
    setuser({
      isLogin: true,
      isPremiumUser: logedUser?.user?.ispremiumuser,
      name: logedUser?.user?.name,
      id: logedUser?.user.id,
      email: logedUser?.user.email,
      budget: logedUser ? logedUser?.budget : 0,
      total_expense: logedUser ? logedUser?.totalExpense : 0,
      income: logedUser ? logedUser?.income : 0,
    })
  };

  const upDateLocalUser = () => {
    const logedUser = JSON.parse(localStorage.getItem("user"));
    setuser({
      isLogin: true,
      isPremiumUser: logedUser?.user?.ispremiumuser,
      name: logedUser?.user?.name,
      id: logedUser?.user.id,
      email: logedUser?.user.email,
      budget: logedUser ? logedUser?.budget : 0,
      total_expense: logedUser ? logedUser?.totalExpense : 0,
      income: logedUser ? logedUser?.income : 0,
    })
  };

  return (
    <UserContext.Provider
      value={{ user, setuser, updateUser, upDateLocalUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
