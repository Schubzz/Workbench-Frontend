import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import useAxios from "../../hooks/useAxios.tsx";

export default function Breadcrumbs() {

    const http = useAxios();

    const location = useLocation();

    const resolvedPath = location.pathname.split("/").filter((item) => item !== "");

    const rootPath = resolvedPath[0];

    const [title, setTitle] = useState('');

    const routeTo = (x: string) => {
        if (x === rootPath) {
            return '/' + rootPath
        } else {
            return '/' + rootPath + '/' + x
        }
    };



    useEffect(() => {
        const id = resolvedPath[1];

        async function fetchProject() {
            const response = await http.get(`/api/projects/${id}`);
            const data = response;
            setTitle(response.data.data.attributes.title);
        }


        if (id) {
            fetchProject();
        }

    }, [resolvedPath]);


    return (
        <>
                <span>

                        <Link
                            to={routeTo(resolvedPath[0])}
                            className="text-small text-text-gray hover:text-accent transition duration-200 ease-in-out"
                        >
                            {resolvedPath[0]}
                        </Link>

                        <span className="text-accent text-medium font-light"> / </span>
                        {title}


                </span>

        </>
    )
}
