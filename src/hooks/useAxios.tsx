import axios from "axios";

const UseAxios = () => {

    const http = axios.create(
        {
            baseURL: 'http://localhost:8000',
            withCredentials: true,
            // withXSRFToken: false,
        }
    )

    const hosts = ['http://localhost:8000', 'http://localhost:4000']

    const getCookie = (cookieName: string) => {
        const cookies = document.cookie;

        const pattern = new RegExp(`(?<=${cookieName}=)[^;]+`, 'g')
        const cookie = cookies.match(pattern)?.[0];

        return cookie;
    };

    http.interceptors.request.use( config => {
        if (!hosts.some(host => config.baseURL === host)) return config;

        const token = getCookie('XSRF-TOKEN');
        if (typeof token === 'undefined') return config;

        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
        return config;
    })

    return http;
}

export default UseAxios