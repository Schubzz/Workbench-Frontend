import {Link} from "react-router-dom";

const AccesDenied = () => {
    return (
        <div>
            <h1>Acces denied</h1>
            <p>Please Log in </p>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}
export default AccesDenied