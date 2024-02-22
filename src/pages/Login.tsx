import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../context/contextUser.tsx";
import axios from "axios";
import {ProjectContext} from "../context/ProjectContext.tsx";


export default function Login() {

    const http = useAxios();
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loginError, setLoginError] = useState(false);

    const {getUser} = useContext(UserContext);
    const {getProjects} = useContext(ProjectContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoginError(false);
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
                setLoginError(true);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 422) {
                    setLoginError(error.response.data.message || 'Login failed');
                } else {
                    setLoginError(true);
                }
            }
        }

    };


    return (

        <div className="w-full h-screen flex flex-col justify-center items-center bg-border p-8 rounded-xl">
            <img src="/Logo.svg"
                 alt="Workbench Logo"
                 className="w-[80px] h-[80px] mx-auto"
            />
            <form className="space-y-6 w-full max-w-[400px]"
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="email"
                           className="block text-sm md:text-medium font-medium leading-6 text-text-light">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                            formNoValidate={true}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            type="text" // type="email" sobald auto validate vom Browser ausgeschaltet werden kann
                            placeholder="example@mail.com"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 font-semibold text-body-bg-hover placeholder:text-text-gray focus:ring-2 focus:ring-inset focus:ring-accent text-small"
                        />
                        {emailError &&
                            <p className="text-small text-text-lightfont-bold bg-red-900 text-center rounded">Please
                                enter a valid Email.</p>}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                               className="block text-sm md:text-medium font-semibold leading-6 text-text-light">
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="xamplePassWord*0815*_!"
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 font-semibold text-body-bg-hover placeholder:text-text-gray focus:ring-2 focus:ring-inset focus:ring-accent text-small"
                        />
                        {passwordError &&
                            <p className="text-small text-text-lightfont-bold bg-red-900 text-center rounded">Please
                                enter a password.</p>}
                    </div>
                </div>

                <div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-text-light shadow-sm hover:text-white"
                    >
                        Sign in
                    </button>
                    {loginError && <div
                        className="text-small text-text-lightfont-bold bg-red-900 text-center rounded">{loginError}</div>}
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className=" text-small">Not registered yet?</h2>
                    <Link to="/register">
                        <p className="text-accent text-small border border-accent">Create Account here</p>
                    </Link>
                </div>
            </form>
        </div>
    )
}

