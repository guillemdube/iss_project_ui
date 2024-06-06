import { useValidateUserToken } from "../../helpers/validation";
import React from "react";
import './Home.module.css';
import Navbar from "../../components/Navbar/Navbar";
   

const Home = () => {
    useValidateUserToken();


    return (
        <Navbar></Navbar> 
    );
}

export default Home;
