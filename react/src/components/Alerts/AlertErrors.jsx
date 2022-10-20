function AlertErrors({ errorMessage, setErrorMessage }) {
    return (
        <>
            {errorMessage ? (
                <div className="text-white px-6 py-4 border-0 relative mb-4 bg-red-500">
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        <b className="capitalize">Error! </b>
                        {errorMessage}
                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                        onClick={() => setErrorMessage('')}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null}
        </>
    );
}

export default AlertErrors;
