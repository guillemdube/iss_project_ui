import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const useValidateUserToken = () => {
    const navigate = useNavigate();

    useEffect(async () => {
        try {
            let localStorageToken = localStorage.getItem("user");
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/current_user`, {
                headers: {
                    'Authorization': localStorageToken
                }
            })
        }
        catch (error) {
            navigate("/");
        }   
    }, []);
}
