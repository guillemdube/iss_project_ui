import React from "react";
import Button from "carbon-react/lib/components/button";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import './Welcome.module.css';
import backgroundImage from "../../images/video-1.gif"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from "react";
   

const Welcome = () => {
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

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
      };
    
      const handleSignupClick = () => {
        navigate('/signup');
      };

      return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            backgroundSize: 'cover',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }} >   
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography color= "white" variant="h1-large" mb={4}>
                    Welcome to the ISS Satellite...
                </Typography>
                <Typography color= "white" variant="h2" mb={8}>
                    a project developed in React and Rails API, using Sage's Carbon Design System
                </Typography>
                <Button type="submit" buttonType="primary" mb={2} size="large" style={{width: '300px'}} onClick={handleLoginClick}>
                    Log in
                </Button>
                <Button type="submit" buttonType="primary" size="large" style={{width: '300px'}} onClick={handleSignupClick}>
                    Create an account
                </Button>
            </Box>
        </div>
    );
}

export default Welcome;
