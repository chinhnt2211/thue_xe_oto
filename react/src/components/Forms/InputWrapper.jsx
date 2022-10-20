function InputWrapper({ children, label }) {
    return (
        <div className="w-full lg:w-7/12 px-4">
            <div className="relative w-full mb-3">
                <span className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    {label}
                </span>
                {children}
            </div>
        </div>
    );
}

export default InputWrapper;
