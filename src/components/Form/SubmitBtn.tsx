const SubmitBtn = ({color, buttonText, error, onClick}: { color?: string, buttonText: string, error?: string, onClick?: () => void }) => {
    return (
        <div className="max-w-96 mt-2">
            <button
                onClick={onClick}
                type="submit"
                className={`flex w-full justify-center rounded-md ${color} px-3 py-1.5 text-sm font-semibold leading-6 text-text-light shadow-sm hover:text-white`}
            >
                {buttonText}
            </button>
            {{error} && <div
                className="text-small text-text-lightfont-bold bg-red-900 text-center rounded">{error}</div>}
        </div>
    )
}

export default SubmitBtn