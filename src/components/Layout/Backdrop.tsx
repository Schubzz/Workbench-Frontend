export default function Backdrop({ isVisible, onClick } : { isVisible: boolean, onClick: () => void }) {
    return (
        <div id="backdrop"
             onClick={onClick}
             className={`fixed top-0 left-0 w-full h-full z-10 opacity-0 invisible bg-bg-trans trans-visible 
             ${isVisible ? 'backdrop-visible' : ''}`}
             role={"presentation"}
        >
        </div>
    );
}
