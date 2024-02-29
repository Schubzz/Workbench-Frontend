import {BaseSyntheticEvent, useContext, useState} from 'react';
import withLayout from '../HOC/withLayout.tsx';
import useAxios from '../hooks/useAxios.tsx';
import {UserContext} from "../context/contextUser.tsx";

const Settings = () => {

    const {user, setUser} = useContext(UserContext);


    const profileImage = user.profile_image;
    const username = user.username;
    const email = user.email;

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);

    const http = useAxios();

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
        } catch (error) {
            console.error('Error changing name:', error);
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
            console.error('Error uploading profile image:', error);
        }
    };

    const handleNewUsername = (e: BaseSyntheticEvent) => {
        setNewName(e.target.value);
    }

    const handleNewEmail = (e: BaseSyntheticEvent) => {
        setNewEmail(e.target.value);
    }

    const handleImageInputChange = (e: BaseSyntheticEvent) => {
        setNewProfileImage(e.target.files[0]);
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Change Name:</label>
                    <input type="text" id="name" value={newName} onChange={handleNewUsername} placeholder={username}/>
                </div>
                <div>
                    <label htmlFor="email">Change Email:</label>
                    <input type="email" id="email" value={newEmail} onChange={handleNewEmail} placeholder={email}/>
                </div>
                <button type="submit">Save</button>
            </form>
            {user &&
                <img src={(newProfileImage && URL.createObjectURL(newProfileImage)) ?? `${profileImage}`}
                     alt="profile-img"
                     className="w-[15rem] h-[15rem] border border-solid rounded-full border-border"/>}
            <div>
                <label htmlFor="profileImage">Upload Profile Image:</label>
                <input type="file" id="profileImage" accept="image/*" onChange={handleImageInputChange}/>
                <button onClick={handleImageUpload}>Upload Image</button>
            </div>
        </div>
    );
};

export default withLayout(Settings);
