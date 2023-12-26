import {createContext, useEffect, useState} from "react";
import useAxios from "../hooks/useAxios.tsx";

export const UserContext = createContext({
    user : {},
    setUser: () => {}
})

export const UserProvider = ({children} : {children: any}) => {

    const http = useAxios();

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

    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{
            user: user,
        }}>
            {children}
        </UserContext.Provider>
    )

}

