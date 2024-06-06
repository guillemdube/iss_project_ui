import Navbar from "../../components/Navbar/Navbar";
import { useValidateUserToken } from "../../helpers/validation";
import React from 'react';
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import Image from "carbon-react/lib/components/image";
import satelliteGif from "../../images/satellite.gif"
import reactRailsImg from "../../images/reactrails.png"

const About = () => { 

    useValidateUserToken();
    return (
        <div>
            <Navbar></Navbar>   
            <Box display="flex" justifyContent="center" alignItems="center" height="90vh" flexDirection="column" >
                <Image alt="" src={satelliteGif} width={"440px"} height={"330px"}  decorative />
                <Typography variant="h1-large" mb ="2">
                About Us
                </Typography>
                <Box display="flex" flexDirection="column">
                    <h4>
                        Welcome to our ISS Satellite Position project! 🛰️ Our mission is to provide real-time information about the International Space Station (ISS) and its diverse positions as it orbits Earth.
                    </h4>
                    <h4>
                        🌍 The ISS, a marvel of international collaboration, circles the Earth at incredible speeds, and our project brings you the latest data on its location, altitude, velocity, and more.
                    </h4>
                    <h4>
                        🚀 Utilizing cutting-edge technologies, we fetch data from public APIs to present you with an interactive experience, allowing you to explore the ISS's journey across the skies.
                    </h4>
                    <h4>
                        Whether you are a space enthusiast, a student, or just curious about the wonders beyond our atmosphere, our project offers a unique and informative glimpse into the fascinating world of space exploration.
                    </h4>
                    <h4>
                        Join us in this celestial journey and discover the wonders of the ISS as it gracefully traverses the cosmos. 🌌
                    </h4>
                    <h4>
                        Thank you for being a part of our space odyssey!
                    </h4>
                </Box>
                
                <Image alt="" src={reactRailsImg} mt={5} width={"120px"} height={"60px"}  decorative/>
            </Box>
        </div>
        
    );
}

export default About;
