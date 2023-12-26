interface ContentProps {
    children: React.ReactNode;
}


export default function Content({children}: ContentProps) {
    return (
        <div id="content"
             className="p-6"
        >
            {children}
        </div>
    )
}