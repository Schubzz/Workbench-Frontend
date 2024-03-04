import { Link } from 'react-router-dom';

const FormLink = ({ label, linkTo, linkText } : { label? : string, linkTo : string, linkText : string }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-small">{label}</h2>
            <Link to={linkTo}>
                <p className="text-accent text-small border border-accent">{linkText}</p>
            </Link>
        </div>
    );
};

export default FormLink;
