import { Label, TextInput, Checkbox, Button } from 'flowbite-react';
import miku from '@/assets/images/miku.jpg';

function Search() {
    return (
        <div>
            <div className="mb-10">
                <img src={miku} className=" object-cover w-full max-h-[500px]" loading="lazy" />
            </div>
            {/* Search */}
            <div
                className="container mx-auto lg:max-w-[840px] p-10 mb-10
            bg-white rounded-lg border shadow-md md:flex-row
            dark:border-gray-700 dark:bg-gray-800"
            >
                <form className="">
                    <div className="mb-5">
                        <label
                            htmlFor="simple-search"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Your email
                        </label>
                        <div className="relative w-full">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search"
                                required=""
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="mb-5">
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Your email
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
                        <div className="mb-5">
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Your email
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
                        <div className="mb-5">
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Your email
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
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="">
                            <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Your email
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
                        <div className="">
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
                        <div className="flex justify-end items-end">
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
            <div className="container mx-auto lg:max-w-[840px] mb-10">
                <a
                    href="#"
                    className="mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:h-[150px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <img
                        className="object-cover w-full h-64 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                        src={'https://i.pinimg.com/originals/a2/d6/f4/a2d6f47442da99d99b5b5d37b5a97cfd.jpg'}
                        alt=""
                    />
                    <div className="grid md:grid-cols-4 h-full">
                        <div className="flex flex-col justify-between p-4 leading-normal col-span-3">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </div>
                        <div className="flex p-5 leading-normal col-span-1 items-end justify-end md:text-end">
                            <p className="mb-2 text-2xl font-bold tracking-tight text-[#f96d01] dark:text-white w-fit">
                                1.168.750
                                <br />
                                <span className="italic font-normal text-base text-gray-700">VND/ngày</span>
                            </p>
                        </div>
                    </div>
                </a>
                <a
                    href="#"
                    className="mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:h-[150px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <img
                        className="object-cover w-full h-64 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                        src={'https://i.pinimg.com/originals/a2/d6/f4/a2d6f47442da99d99b5b5d37b5a97cfd.jpg'}
                        alt=""
                    />
                    <div className="grid md:grid-cols-4 h-full">
                        <div className="flex flex-col justify-between p-4 leading-normal col-span-3">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </div>
                        <div className="flex p-5 leading-normal col-span-1 items-end justify-end md:text-end">
                            <p className="mb-2 text-2xl font-bold tracking-tight text-[#f96d01] dark:text-white w-fit">
                                1.168.750
                                <br />
                                <span className="italic font-normal text-base text-gray-700">VND/ngày</span>
                            </p>
                        </div>
                    </div>
                </a>
                <a
                    href="#"
                    className="mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:h-[150px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <img
                        className="object-cover w-full h-64 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                        src={'https://i.pinimg.com/originals/a2/d6/f4/a2d6f47442da99d99b5b5d37b5a97cfd.jpg'}
                        alt=""
                    />
                    <div className="grid md:grid-cols-4 h-full">
                        <div className="flex flex-col justify-between p-4 leading-normal col-span-3">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </div>
                        <div className="flex p-5 leading-normal col-span-1 items-end justify-end md:text-end">
                            <p className="mb-2 text-2xl font-bold tracking-tight text-[#f96d01] dark:text-white w-fit">
                                1.168.750
                                <br />
                                <span className="italic font-normal text-base text-gray-700">VND/ngày</span>
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Search;
