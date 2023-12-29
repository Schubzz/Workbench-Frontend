import {createContext, useEffect, useState} from "react";
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from "react-router-dom";

export const UserContext = createContext({
    user: {},
    setUser: () => {
    },
    logout: () => {
    }
})

export const UserProvider = ({children}: { children: any }) => {

    const http = useAxios();
    const navigate = useNavigate();

    const [user, setUser] = useState();

    const getUser = async () => {
        try {
            const response = await http.get('/api/user');
            setUser(response.data)
        } catch (error) {
            console.error('Error fetching User data:', error);
            throw error;
        }
    }

    // const logout = async () => {
    //     await http.get('/api/logout')
    //     setUser(null)
    // }

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
            logout: logout
        }}>
            {children}
        </UserContext.Provider>
    )

}

