const LogoComponent = ({size} : {size : string}) => {
    return (
        <img
            src="/Logo.svg"
            alt="Workbench Logo"
            className={`w-[${size}] h-[${size}] mx-auto`}
        />
    );
};

export default LogoComponent;
