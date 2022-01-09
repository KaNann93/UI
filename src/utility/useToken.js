import { useState } from "react";

export async function validateToken() {
  console.log("validate token");
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  if(userToken !== undefined) {
    const isValid = await fetch("/validateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userToken,
      }),
    });
    return isValid;
  }
  else return false;
}
export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    console.log(userToken);
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
    debounce(removeToken,30*60*1000)();
  };

  let timer=undefined;

  const removeToken=()=>{
    localStorage.removeItem("token");
    setToken("NA");
  }
  const debounce=(fn,delay)=>{
    return function (...arg){
      if(timer){
        clearTimeout(timer);
      }
      timer=setTimeout(()=>{
        fn(...arg);
      },delay);
    }
  }  

  const updateToken=()=>{
    debounce(removeToken,30*60*1000);
  }
  return {
    setToken: saveToken,
    token,
    updateToken,
  };
}
