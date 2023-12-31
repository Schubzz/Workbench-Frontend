import {Link, useLocation} from "react-router-dom";

export default function Breadcrumbs() {

    const location = useLocation();

    const resolvedPath = location.pathname.split("/").filter((item) => item !== "");

    const rootPath = resolvedPath[0];

    const routeTo = (x: string) => {
        if (x === rootPath) {
            return '/' + rootPath
        } else {
            return '/' + rootPath + '/' + x
        }
    };

    return (
        <>
            {resolvedPath.map((x: string, i: number) => (
                <span key={i}>
                    {i > 0 && <span className="text-accent text-medium font-light"> / </span>}
                    <Link
                        className="text-text-gray font-medium hover:text-accent transition-all duration-200 ease-in-out"
                        to={routeTo(x)}
                    >
                        {x}
                    </Link>
                </span>
            ))}
        </>
    )
}
