import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from "carbon-react/lib/components/button";
import Box from "carbon-react/lib/components/box";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import Link from "carbon-react/lib/components/link";
import Toast from "carbon-react/lib/components/toast";
import { useNavigate } from "react-router-dom";

const Signup = () => { 
    
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
        password: '',
        name: ''
    })
   
    const [errorMessage, setErrorMessage] = useState("Default error") 

    const [errorSignupState, setErrorSignupState] = useState(false)

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onDismissClick = () => {
        setErrorSignupState(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {user: formData})
            if (response.headers.authorization){
                localStorage.setItem("user", response.headers.authorization);
            }
            setErrorSignupState(false)
            navigate("/home");
        }
        catch (error) {
            console.log(error.response)
            setErrorMessage(error.response.data.status.message)
            setErrorSignupState(true)
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" width="300px">
                    <Typography variant="h1">
                        Get on board!
                    </Typography>
                    <Textbox
                        mt="24px"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        error={errorSignupState}
                        required
                    />
                    <Textbox
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        error={errorSignupState}
                        required
                    />
                    <Textbox
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        error={errorSignupState}
                        inputHint="Minimum 8 characters"
                        required
                    />
                    <Button type="submit" buttonType="primary" mt="16px" mb="16px">
                        Sign up
                    </Button>
                    <Link
                        href="/login"
                        rel="noreferrer noopener"
                        variant="neutral"
                    >
                    You have an account? Log in
                    </Link>
                    <Toast variant="error" open={errorSignupState} onDismiss={onDismissClick} timeout={5000}>
                        {errorMessage}
                    </Toast>
                </Box>       
            </form>
        </Box>
    );
}

export default Signup;
