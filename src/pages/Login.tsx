import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import useAxios from "../hooks/useAxios.tsx";

const Login = () => {

    const http = useAxios();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_repeat, setPassword_Repeat] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [password_repeatError, setPassword_RepeatError] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && password) {

            const formData = new FormData();
            formData.set('email', email);
            formData.set('password', password);


            await http.get('/sanctum/csrf-cookie')

            const response = await http.post(
                '/api/login',
                {'email': email, 'password': password},
                {headers: {'Content-Type': 'application/json'}}
            )

            console.log(response.data)
        }
    }

    return (

        <h1 className="text-xlarge text-text-light">LOGIN</h1>
    )
}

export default Login
