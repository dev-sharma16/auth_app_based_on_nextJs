"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email : "",
        password : "",
        username: "",
    })
    
    const [buttonDisabled, setButtonDisabled]= React.useState(false);
    const [loading, setLoading] = useState(false);

    const onSignUp = async () => {
       try {
          setLoading(true);
          const response = await axios.post("/api/users/signUp", user);
          console.log("SignUp success", response.data);
          router.push("/login")
          
       } catch (error: any) {
          console.log("SignUp is failed..!", error.message);
          toast.error(error.message);

       } finally {
          setLoading(false);
        
       }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    }, [user])
 
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>{loading ? "Loading.." : "SignUp"}</h1>
           <hr />
           <label htmlFor="username">Username : </label>
           <input className="p-2 border-gray-300 rounded-l-lg mb-4 focus:outline-none focus:border-gray-600"
                  id="username"
                  type="text"
                  value={user.username} 
                  onChange={(e)=> setUser({...user,username: e.target.value})}
                  placeholder="username"
            />

           <label htmlFor="email">E-mail : </label>
           <input className="p-2 border-gray-300 rounded-l-lg mb-4 focus:outline-none focus:border-gray-600"
                  id="email"
                  type="text"
                  value={user.email} 
                  onChange={(e)=> setUser({...user,email: e.target.value})}
                  placeholder="email"
            />

           <label htmlFor="password">Password : </label>
           <input className="p-2 border-gray-300 rounded-l-lg mb-4 focus:outline-none focus:border-gray-600"
                  id="password"
                  type="password"
                  value={user.password} 
                  onChange={(e)=> setUser({...user,password: e.target.value})}
                  placeholder="password"
            />

            <button onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled ? "Fill the details" : "Create Account"}
            </button>

            <Link href="/login">Visit login page</Link>
                  
        </div>
    )
}