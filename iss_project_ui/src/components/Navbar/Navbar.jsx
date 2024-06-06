import NavigationBar from "carbon-react/lib/components/navigation-bar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
    Menu,
    MenuItem,
  } from "carbon-react/lib/components/menu";

const Navbar = () => { 

    const navigate = useNavigate();
    
    const logout = async (event) => {
        event.preventDefault()
        try {
            let localStorageToken = localStorage.getItem("user");
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/logout`, {
                headers: {
                    'Authorization': localStorageToken
                }
            })
            localStorage.removeItem("user");
            navigate("/");

        }
        catch (error) {
            console.log(error.response)
        }
    }

    const aboutRoute = () => {
        navigate("/about");
    }

    const satelliteRoute = () => {
        navigate("/satellite");
    }

    const profileRoute = () => {
        navigate("/profile");
    }
     

    return (
        <NavigationBar
            position="sticky"
            orientation="top"
        >
            <Menu >
            <MenuItem onClick={profileRoute}>Profile</MenuItem>
            <MenuItem onClick={aboutRoute}>About</MenuItem>
            <MenuItem onClick={satelliteRoute}>Satellite</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
        </NavigationBar>
    );
}

export default Navbar;
