import {Link} from "react-router-dom";




export default function NavLink({linkText, link, linkIcon}: { linkText: string, link: string, linkIcon: string }) {
    return (
        <li className="text-small font-medium transition hover:bg-body-bg-hover">
            <Link to={link} className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                <img src={linkIcon} alt={linkText} className="w-6 h-6"/>
                <p>
                    {linkText}
                </p>
            </Link>

        </li>
    )
        ;
}