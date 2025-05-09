"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios, { Axios } from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email : "",
        password : "",
    })
    
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
         try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("Login Success", response.data);
            router.push("/profile")
            

         } catch (error: any) {
            console.log("Login Success", error.message);
            toast.error(error.message);
            
         } finally{
             setLoading(false);
         }
    }

    useEffect(()=>{
         if(user.email.length > 0 && user.password.length > 0){
             setButtonDisabled(false)
         }
         else{
             setButtonDisabled(true)
         }
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>{loading ? "Loading.." : "Login"}</h1>
           <hr />

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

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled ? "Fill the details" : "Login"}
            </button>

            <Link href="/signUp">Visit SignUp page</Link>
                  
        </div>
    )
}

