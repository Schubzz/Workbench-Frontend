import React, {useState} from "react";
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from 'react-router-dom';
import InputField from "../components/Form/InputField.tsx";
import SubmitBtn from "../components/Form/SubmitBtn.tsx";
import axios from "axios";
import FormLink from "../components/Form/FormLink.tsx";
import Logo from "../assets/Logo.tsx";

export default function Register() {

    const http = useAxios();
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [registerError, setRegisterError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setRegisterError('');
        setUsernameError(false);
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);

        if (!username) {
            setUsernameError(true);
            console.log('Username field required');
        } else if (username.length < 3) {
            setUsernameError(true);
            console.log('Username must be at least 3 characters long');
        }

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError(true);
            console.log('Email field required');
        } else if (!isEmail.test(email)) {
            setEmailError(true);
            console.log('Invalid Email');
        }

        if (!password) {
            setPasswordError(true);
            console.log('Password field required');
        }

        if (!confirmPassword) {
            setConfirmPasswordError(true);
            console.log('Confirm password field required');
        } else if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            console.log('Passwords do not match');
        }

        if (!username || !email || !password || !confirmPassword || password !== confirmPassword) {
            return;
        }

        try {
            const response = await http.post(
                '/api/register',
                {'username': username, 'email': email, 'password': password},
                {headers: {'Content-Type': 'application/json'}}
            );

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 422) {
                    setRegisterError(error.response.data.message);
                } else {
                    setRegisterError('Registration failed');
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
                    id="username"
                    label="Username"
                    type="text"
                    placeholder=""
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError ? "Username must be at least 3 characters" : ""}
                />

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

                <InputField
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    placeholder="repeat Password"
                    autoComplete="current-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError ? "Passwords do not match" : ""}
                />

                <SubmitBtn
                    buttonText="Sign up"
                    color={"bg-accent"}
                    error={registerError}
                />

                <FormLink
                    label="Already signed up?"
                    linkTo="/login"
                    linkText="Login"
                />
            </form>
        </div>
    )
}
