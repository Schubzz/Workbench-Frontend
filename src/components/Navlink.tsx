import {Link} from "react-router-dom";

export default function NavLink({linkText, link}: { linkText: string, link: string }) {
    return (
        <li className="text-small font-medium transition hover:bg-body-bg-hover">
            <Link to={link}
                  className="flex items-center justify-start h-full w-full gap-2 px-4 py-2">
                <div className="w-[20px] h-[20px] border custom-border-radius bg-accent">

                </div>
                <p>
                    {linkText}
                </p>
            </Link>

        </li>
    )
        ;
}