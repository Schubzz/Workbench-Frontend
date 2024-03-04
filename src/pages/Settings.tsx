import {BaseSyntheticEvent, useContext, useState} from 'react';
import withLayout from '../HOC/withLayout.tsx';
import useAxios from '../hooks/useAxios.tsx';
import {UserContext} from "../context/contextUser.tsx";
import InputField from "../components/Form/InputField.tsx";
import SubmitBtn from "../components/Form/SubmitBtn.tsx";
import DeleteConfirm from "../DeleteConfirm.tsx";
import {useNavigate} from "react-router-dom";

const Settings = () => {

    const {user, setUser} = useContext(UserContext);


    const profileImage = user.profile_image;
    const username = user.username;
    const email = user.email;

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [profileImageError, setProfileImageError] = useState('');

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const http = useAxios();
    const navigate = useNavigate();

    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        try {
            const data: { username?: string, email?: string } = {};
            if (newName) {
                data.username = newName;
            }
            if (newEmail) {
                data.email = newEmail;
            }
            await http.patch('/api/update-profile', data);
            setUser(prevState => ({...prevState, username: newName, email: newEmail}));
            console.log('Profile updated successfully');
        } catch (error : any) {
            const UsernameError = error?.response?.data?.errors?.username?.[0] ?? null;
            const EmailError = error?.response?.data?.errors?.email?.[0] ?? null;
            if (UsernameError) {
                setUsernameError(UsernameError);
            }
            if (EmailError) {
                setEmailError(EmailError);
            }
            console.error('Error updating profile:', error);
        }
    };

    const handleImageUpload = async () => {
        try {
            await http.post('/api/upload-profile-image', {profile_image: newProfileImage}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUser(prevState => ({...prevState, profile_image: URL.createObjectURL(newProfileImage!)}));
            console.log('Profile image uploaded successfully');
        } catch (error) {
            setProfileImageError('Error uploading profile image');
            console.error('Error uploading profile image:', error.response.data.message);
        }
    };

    const handleDeleteProfileImage = async () => {
        try {
            await http.delete('/api/delete-profile-image');
            setUser(prevState => ({...prevState, profile_image: "default.jpg"}));
            console.log('Profile image deleted successfully');
        } catch (error: string) {
            console.error('Error uploading profile image:', error);
            console.log('Server response:', error.response);
        }
    };

    const handleNewUsername = (e: BaseSyntheticEvent) => {
        setNewName(e.target.value);
    }

    const handleDeleteAccount = async () => {
        try {
            await http.delete('/api/delete-account');
            navigate('/register');
            console.log('Account deleted successfully');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleNewEmail = (e: BaseSyntheticEvent) => {
        setNewEmail(e.target.value);
    }

    const handleImageInputChange = (e: BaseSyntheticEvent) => {
        setNewProfileImage(e.target.files[0]);
    };

    return (
        <div className=" flex flex-col justify-center ">
            <form onSubmit={handleSubmit}>
                <InputField
                    id="username"
                    label="Change Name:"
                    type="text"
                    placeholder={username}
                    autoComplete="username"
                    value={newName}
                    onChange={handleNewUsername}
                    error={usernameError}
                />

                <InputField
                    id="email"
                    label="Change Email:"
                    type="text"
                    placeholder={email}
                    autoComplete="email"
                    value={newEmail}
                    onChange={handleNewEmail}
                    error={emailError}
                />

                <SubmitBtn
                    buttonText={"Save"}
                    color={"bg-accent"}
                />
            </form>

            {user &&
                <img src={(newProfileImage && URL.createObjectURL(newProfileImage)) ?? `${profileImage}`}
                     alt="profile-img"
                     className="w-[10rem] h-[10rem] my-6 rounded-md"/>}
            <div>
                <InputField
                    id={profileImage}
                    label="Upload Profile Image"
                    type="file"
                    onChange={handleImageInputChange}
                />

                <SubmitBtn
                    buttonText={"Upload Image"}
                    onClick={handleImageUpload}
                    error={profileImageError}
                    color={"bg-accent"}
                />
            </div>

            <SubmitBtn
                buttonText={"Delete Image"}
                onClick={handleDeleteProfileImage}
                color={"bg-red-500"}
            />

            <div className="mt-6">
                <SubmitBtn
                    buttonText={"Delete Account"}
                    onClick={() => setIsDeleteModalOpen(true)}
                    color={"bg-red-500"}
                />
            </div>

            <DeleteConfirm
                onCancel={() => setIsDeleteModalOpen(false)}
                handleConfirmDelete={handleDeleteAccount}
                isOpen={isDeleteModalOpen}
            />

        </div>
    );
};

export default withLayout(Settings);
