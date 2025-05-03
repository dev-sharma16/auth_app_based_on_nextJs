import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect(); 

export async function POST(request:NextRequest){
    try {
        
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);
        
        // check if the user is exists
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({error: "User does not exists"},{status: 500});
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "Invalid Password"},{status: 500});
        }
        
        // creating token data
        const tokenData= {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // creating token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        
        response.cookies.set("token", token, {httpOnly: true});

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
    
}