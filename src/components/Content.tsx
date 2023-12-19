interface ContentProps {
    children: React.ReactNode;
}

const Content = ({children} : ContentProps) => {
    return (
        <div id="content"
             className="p-6"
        >
            {children}
        </div>
    )
}
export default Content