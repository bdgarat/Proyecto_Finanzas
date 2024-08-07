import axios from "axios";
export async function refreshToken(refresh_token)
{
    try{
        const response = await axios({
            method:"post",
            url:"http://127.0.0.1:5000/auth/refresh",
            data:{
                "refresh_token":refresh_token
            }
        })
        return response.data.access_token;
    }catch(error)
    {
        console.log(error);
    }
}