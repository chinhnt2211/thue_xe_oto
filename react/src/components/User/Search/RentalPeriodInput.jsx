import { useState, useEffect } from 'react';

const today = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

function ReceiveDateInput({getRentDate, getReturnDate}) {
    const [rentDate, setRentDate] = useState(today);
    const [returnDate, setReturnDate] = useState(tomorrow);

    useEffect(() => {
        if (rentDate < today) {
            setRentDate(today);
        };

        if (rentDate >= returnDate) {
            const date = new Date(new Date(rentDate).getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
            setReturnDate(date);
        };

        getRentDate(rentDate);
        getReturnDate(returnDate);
    }, [rentDate, returnDate])

    return (
        <div className="grid md:grid-cols-3 md:gap-6">
            <div className="mb-5">
                <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Ngày nhận
                </label>
                <div className="relative w-full">
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={rentDate}
                        onChange={(e) => setRentDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Ngày trả
                </label>
                <div className="relative w-full">
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>
            </div>
        </div>

    );
}

export default ReceiveDateInput;