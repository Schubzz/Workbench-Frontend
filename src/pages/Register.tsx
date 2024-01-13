import {useState} from "react";
import {Link} from "react-router-dom";
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from 'react-router-dom';

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
            if (error.response && error.response.status === 422) {
                setRegisterError(error.response.data.message);
            } else {
                setRegisterError('Registration failed');
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
                    <label htmlFor="username"
                           className="block text-sm md:text-medium font-medium leading-6 text-text-light">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            formNoValidate={true}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            name="username"
                            type="text"
                            placeholder=""
                            autoComplete="username"
                            className="block w-full rounded-md border-0 py-1.5 font-semibold text-body-bg-hover placeholder:text-text-gray focus:ring-2 focus:ring-inset focus:ring-accent text-small"
                        />
                        {usernameError &&
                            <p className="text-small text-text-lightfont-bold bg-red-900 text-center rounded">Username
                                must be at least 3 characters long</p>}
                    </div>
                </div>

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
                    <div className="flex items-center justify-between">
                        <label htmlFor="confirm-password"
                               className="block text-sm md:text-medium font-semibold leading-6 text-text-light">
                            Confirm Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            placeholder="Repeat your password"
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 font-semibold text-body-bg-hover placeholder:text-text-gray focus:ring-2 focus:ring-inset focus:ring-accent text-small"
                        />
                        {confirmPasswordError &&
                            <p className="text-small text-text-lightfont-bold bg-red-900 text-center rounded">Passwords
                                do not match</p>}
                    </div>
                </div>

                <div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-text-light shadow-sm hover:text-white"
                    >
                        Sign up
                    </button>
                    {registerError && <div
                        className="text-small text-text-lightfont-bold bg-red-900 text-center rounded">{registerError}</div>}
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className=" text-small">Already signed up?</h2>
                    <Link to="/login">
                        <p className="text-accent text-small border border-accent">Login</p>
                    </Link>
                </div>
            </form>
        </div>
    )
}
