import React, {useState, useContext} from "react";
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../context/contextUser.tsx";
import axios from "axios";
import {ProjectContext} from "../context/ProjectContext.tsx";
import Logo from "../assets/Logo.tsx";
import SubmitBtn from "../components/Form/SubmitBtn.tsx";
import FormLink from "../components/Form/FormLink.tsx";
import InputField from "../components/Form/InputField.tsx";


export default function Login() {

    const http = useAxios();
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loginError, setLoginError] = useState('');

    const {getUser} = useContext(UserContext);
    const {getProjects} = useContext(ProjectContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoginError('');
        setEmailError(false);
        setPasswordError(false);

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError(true);
            console.log('Email field required')
        } else if (!isEmail.test(email)) {
            setEmailError(true);
            console.log('not a valid Email')
        }

        if (!password) {
            setPasswordError(true);
            console.log('Password field required')
        }

        if (!email || !password) {
            return;
        }


        try {
            await http.get('/sanctum/csrf-cookie');
            const response = await http.post(
                '/api/login',
                {'email': email, 'password': password},
                {headers: {'Content-Type': 'application/json'}}
            );

            if (response.status === 200) {
                getUser();
                getProjects();
                navigate('/dashboard')
            } else {
                setLoginError('Login failed');
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 422) {
                    setLoginError(error.response.data.message || 'Login failed');
                } else {
                    setLoginError('Login failed');
                }
            }
        }

    };


    return (

        <div className="w-full h-screen flex flex-col justify-center items-center bg-border p-8 rounded-xl">

            <Logo
                size="80px"
            />

            <form className="space-y-6 w-full max-w-[400px]"
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit}
            >

                <InputField
                    id="email"
                    label="Email"
                    type="text"
                    placeholder="example@mail.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError ? "Please enter a valid email." : ""}
                />

                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="xamplePassWord*0815*_!"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError ? "Please enter a valid password." : ""}
                />

                <SubmitBtn
                    buttonText="Sign in"
                    color={"bg-accent"}
                    error={loginError}
                />

                <FormLink
                    label="Not registered yet?"
                    linkTo="/register"
                    linkText="Register"
                />
            </form>
        </div>
    )
}

