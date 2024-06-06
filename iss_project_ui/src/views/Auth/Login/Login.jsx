import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from "carbon-react/lib/components/button";
import Box from "carbon-react/lib/components/box";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import Link from "carbon-react/lib/components/link";
import Toast from "carbon-react/lib/components/toast";
import { useNavigate } from "react-router-dom";


const Login = () => { 

    const navigate = useNavigate();

    useEffect(async () => {
        try {
            let localStorageToken = localStorage.getItem("user");
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/current_user`, {
                headers: {
                    'Authorization': localStorageToken
                }
            })
            navigate("/home");
        }
        catch (error) {
            console.log(error.response)
        }   
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errorLoginState, setErrorLoginState] = useState(false)

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onDismissClick = () => {
        setErrorLoginState(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {user: formData})
            if (response.headers.authorization){
                localStorage.setItem("user", response.headers.authorization);
            }
            setErrorLoginState(false)
            navigate("/home");

        }
        catch (error) {
            console.log(error.response)
            setErrorLoginState(true)
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" width="300px">
                    <Typography variant="h1">
                        Log in
                    </Typography>
                    <Textbox
                        mt="24px"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        error={errorLoginState}
                        required
                    />
                    <Textbox
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        error={errorLoginState}
                        required
                    />
                    <Button type="submit" buttonType="primary" mt="16px" mb="16px">
                        Log in
                    </Button>
                    <Link
                        href="signup"
                        rel="noreferrer noopener"
                        variant="neutral"
                    >
                        Create an account
                    </Link>
                    <Toast variant="error" open={errorLoginState} onDismiss={onDismissClick} timeout={5000}>
                        Login not successful
                    </Toast>
                </Box>       
            </form>
        </Box>
    );
}

export default Login;
