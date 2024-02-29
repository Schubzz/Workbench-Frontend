import React, {createContext, Dispatch, useEffect, useState} from "react";
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from "react-router-dom";
import UserInterface from "../interfaces/UserInterface.tsx";


export const UserContext = createContext({
    user: {
        username: '',
        email: '',
        profile_image: '',
        id: '',
        created_at: '',
        updated_at: ''
    },
    setUser: ( () => {} ) as  Dispatch<React.SetStateAction<UserInterface>>,
    logout: () => {
    },
    getUser : () => {
    }
})

export const UserProvider = ({children}: { children: any }) => {

    const http = useAxios();
    const navigate = useNavigate();

    const [user, setUser] = useState<UserInterface>({username: '', email: '', profile_image: '', id: '' , created_at: '', updated_at: ''});

    const getUser = async () => {
        try {
            const response = await http.get('/api/user');
            setUser(response.data)
        } catch (error) {
            console.error('Error fetching User data:', error);
            throw error;
        }
    }

    const logout = async () => {
        try {
            await http.get('/api/logout');
            setUser(null);
            navigate('/login');
            console.log('You are logged out now!')
        } catch (error) {
            console.error('Fehler beim Logout:', error);
        }
    };

    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{
            user: user,
            logout: logout,
            getUser: getUser,
            setUser: setUser
        }}>
            {children}
        </UserContext.Provider>
    )

}

