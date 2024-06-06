import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import Box from "carbon-react/lib/components/box/box.component";
import Typography from "carbon-react/lib/components/typography/typography.component";
import Hr from "carbon-react/lib/components/hr";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Image from "carbon-react/lib/components/image";
import predeterminedLogo from "../../images/logo_user.png";
import Link from "carbon-react/lib/components/link/link.component";
import FileInput from "carbon-react/lib/components/file-input/file-input.component";
import Button from "carbon-react/lib/components/button/button.component";
import Loader from "carbon-react/lib/components/loader";
import Toast from "carbon-react/lib/components/toast";

const ProfileView = () => {
    const [user, setUser] = useState({
        email : '',
        name : '',
        id : '',
        image: ''
    });
    const [editedName, setEditedName] = useState(user.name);
    const [editedEmail, setEditedEmail] = useState(user.email);  
    const [loading, setLoading] = useState(true);
    const [disabledButton, setDisabledButton] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [successChange, setSuccessChange] = useState(false)
    const [errorChange, setErrorChange] = useState(false)


    useEffect(async () => {
        setLoading(true);
        try {
            let localStorageToken = localStorage.getItem("user");
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/current_user`, {
                headers: {
                    'Authorization': localStorageToken
                }
            })
            if (response.data.image_url != null) {
                setUser({
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id,
                    image: response.data.image_url
                })
                setDisabledButton(false)
                setLoading(false)
            }
            else {
                setUser({
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id,
                    image: predeterminedLogo
                })
                setDisabledButton(true)
                setLoading(false)
            }
            
        }
        catch (error) {
            navigate("/");
        }   
    }, []);
    
    const navigate = useNavigate();

    const uploadPhoto = async (event) => {
        try {
            let formData = new FormData();
            formData.append('image', event[0]);
            let localStorageToken = localStorage.getItem("user");
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/change_image`, formData, {
                headers: {
                    'Authorization': localStorageToken
                }
            })
            setUser({
                name: user.name,
                email: user.email,
                id: user.id,
                image: response.data.image_url
            })
            setDisabledButton(false)
            setSuccessChange(true);
            
        } catch (error) {
            console.log(error.response)
            
        }
    }

    const deletePhoto = async () => {
        try {
            let localStorageToken = localStorage.getItem("user");
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete_image`, {
                headers: {
                    'Authorization': localStorageToken
                }
            })
            setUser({
                name: user.name,
                email: user.email,
                id: user.id,
                image: predeterminedLogo
            })
            setDisabledButton(true)
            setSuccessChange(true);

        } catch (error) {
            console.log(error.response)
        }
    } 

    const onDismissClick = () => {
        setErrorChange(false);
        setSuccessChange(false);
    }

    const handleEditNameClick = () => {
        setIsEditingName(true);
    };

    const handleEditEmailClick = () => {
        setIsEditingEmail(true);
    };

    const handleCancelNameClick = () => {
        setEditedName(user.name);
        setIsEditingName(false);
    };

    const handleCancelEmailClick = () => {
        setEditedEmail(user.email);
        setIsEditingEmail(false);
    };

    const handleNameInputChange = (e) => {
        setEditedName(e.target.value);
    };

    const handleEmailInputChange = (e) => {
        setEditedEmail(e.target.value);
    };

    const handleSaveNameClick = () => {
        const updatedUser = { ...user, name: editedName };
        updateUserData(updatedUser);
        setUser(updatedUser);
        setIsEditingName(false);
    };
      
    const handleSaveEmailClick = () => {
        const updatedUser = { ...user, email: editedEmail };
        updateUserData(updatedUser);
        setUser(updatedUser);
        setIsEditingEmail(false);
    };

    const updateUserData = async (updatedUser) => {
        try {
            let localStorageToken = localStorage.getItem("user");
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/update_user`, {user: updatedUser}, {
                headers: {
                'Authorization': localStorageToken,
                'Content-Type': 'application/json',
                },
            });
            setSuccessChange(true);
        } catch (error) {
          console.log(error.response);
          setErrorChange(true);
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <Box display="flex" justifyContent="center" alignItems="top" height="100vh">
                {loading ? (
                    <Loader/>
                ) : (
                    <>
                        <Box display="flex" flexDirection="row" width={600} my={4}>
                            <Box display="flex" flexDirection="column" mx={8}>
                                <Typography variant="h1-large" mt={4}>
                                    {user.name}'s profile
                                </Typography>
                                <Hr mb={8}/>
                                <Box my={4}>
                                    <Typography variant="h1" my={2}>
                                        Name
                                    </Typography>

                                    {isEditingName ? (
                                        <>
                                        <input type="text" value={editedName} onChange={handleNameInputChange} />
                                        <button onClick={handleSaveNameClick}>Save</button>
                                        <button onClick={handleCancelNameClick}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                        <Typography variant="h4" mb={2}>
                                            {user.name}
                                        </Typography>
                                        <Link icon="edit" onClick={handleEditNameClick}>
                                            &nbsp;&nbsp;Change username
                                        </Link>
                                        </>
                                    )}
                                </Box>
                                <Box my={4}>
                                    <Typography variant="h1" my={2}>
                                        Email
                                    </Typography>

                                    {isEditingEmail ? (
                                        <>
                                        <input type="text" value={editedEmail} onChange={handleEmailInputChange} />
                                        <button onClick={handleSaveEmailClick}>Save</button>
                                        <button onClick={handleCancelEmailClick}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                        <Typography variant="h4" mb={2}>
                                            {user.email}
                                        </Typography>
                                        <Link icon="edit" onClick={handleEditEmailClick}>
                                            &nbsp;&nbsp;Change email
                                        </Link>
                                        </>
                                    )}
                                </Box>
                                <Box my={4}>
                                    <Typography variant="h1" my={2}>
                                        Password
                                    </Typography>
                                    <Link icon="edit">
                                        &nbsp;&nbsp;Set a new password
                                    </Link>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mx={8}>
                                <Image alt="" src={user.image} decorative size={200}/>    
                                <Button
                                    mt={2}
                                    buttonType="primary"
                                    destructive
                                    iconType="delete"
                                    iconPosition="before"
                                    ml={2}
                                    disabled={disabledButton}
                                    onClick={deletePhoto}
                                >
                                    &nbsp;&nbsp;Delete photo
                                </Button>
                                <FileInput my={2}
                                    label="" 
                                    buttonText="Update profile photo" 
                                    isVertical 
                                    accept=".jpg, .jpeg, .png" 
                                    maxWidth="100%" 
                                    onChange={uploadPhoto} 
                                />
                                <Toast variant="success" open={successChange} onDismiss={onDismissClick} timeout={5000}>
                                    The data was saved correctly
                                </Toast>
                                <Toast variant="error" open={errorChange} onDismiss={onDismissClick} timeout={5000}>
                                    We couldn't save the data correctly
                                </Toast>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>    
        </div>
    );

}

export default ProfileView;