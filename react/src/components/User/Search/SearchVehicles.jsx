import { useState } from "react";
import { LocationInput, ReceiveDateInput, BrandInput } from "./components";

function SearchVehicles() {
    const [location, setLocation] = useState("");
    const [rentDate, setRentDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    console.log(location, rentDate, returnDate);

    return (
        <div
            className="container mx-auto lg:max-w-[840px] p-10 mb-10
    bg-white rounded-lg border shadow-md md:flex-row
    dark:border-gray-700 dark:bg-gray-800"
        >
            <form className="">
                {/* Popper Search Location */}
                <LocationInput getLocation={(value) => {
                    setLocation(value);
                    // console.log(value);
                }} />
                {/* End Popper Search Location */}

                {/* Received Date */}

                <ReceiveDateInput
                    getRentDate={(value) => {
                        setRentDate(value);
                    }}
                    getReturnDate={(value) => {
                        setReturnDate(value);
                    }}
                />
                {/* End Receive Date */}

                <div className="grid md:grid-cols-6 md:gap-6">
                    {/* Brands */}
                    <BrandInput />
                    {/* End Brands */}
                    
                    <div className=" md:col-span-1">
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            So Cho
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Your email
                        </label>
                        <div className="flex h-[42px] content-center justify-between">
                            <div className="flex items-center mr-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="inline-radio"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Mới
                                </label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input
                                    id="inline-2-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="inline-2-radio"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Cũ
                                </label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input
                                    id="inline-checked-radio"
                                    type="radio"
                                    value=""
                                    defaultChecked
                                    name="inline-radio-group"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="inline-checked-radio"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Tất cả
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end items-end">
                        <div className="relative h-fit">
                            <button
                                type="submit"
                                className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="mr-2 -ml-1 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchVehicles;
