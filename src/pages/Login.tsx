import {useState} from "react";
import {Link} from "react-router-dom";
import useAxios from "../hooks/useAxios.tsx";
import {useNavigate} from 'react-router-dom';


export default function Login() {

    const http = useAxios();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

            if (response.status === 204) {
                // Bei Erfolg zur Dashboard-Seite navigieren
                navigate('/dashboard');
                console.log('You are now logged in!')
            } else {
                // Fehlerbehandlung, z.B. eine Fehlermeldung anzeigen
                console.log('Login failed:', response.data.message);
            }

            console.log(response.data)
        }
    }

    return (

        <div className="w-full h-screen flex flex-col justify-center items-center bg-border p-8 rounded-xl">
            <img src="/src/assets/Logo-icon.svg"
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
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@mail.com"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 font-semibold text-body-bg-hover placeholder:text-text-gray focus:ring-2 focus:ring-inset focus:ring-accent text-small"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                               className="block text-sm md:text-medium font-semibold leading-6 text-text-light">
                            Password
                        </label>
                        {/*<div className="text-sm">*/}
                        {/*    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                        {/*        Forgot password?*/}
                        {/*    </a>*/}
                        {/*</div>*/}
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
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-text-light shadow-sm"
                    >
                        Sign in
                    </button>
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

