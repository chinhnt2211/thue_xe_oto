import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import config from '@/config';

import { UserDropdown, NotificationDropdown } from '@/components/Dropdowns';

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = useState('hidden');
    const admin = useSelector((sate) => sate.auth.admin);

    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    {/* Brand */}
                    <Link
                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        to={config.routes.admin.dashboard}
                    >
                        Thuê Ô tô
                    </Link>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <NotificationDropdown />
                        </li>
                        <li className="inline-block relative">
                            <UserDropdown />
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        to={config.routes.admin.dashboard}
                                    >
                                        Thuê Ô tô
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow('hidden')}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Admin Layout Pages
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <li className="items-center">
                                <Link
                                    className={
                                        'text-xs uppercase py-3 font-bold block ' +
                                        (window.location.href.indexOf(config.routes.admin.dashboard) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to={config.routes.admin.dashboard}
                                >
                                    <i
                                        className={
                                            'fas fa-tv mr-2 text-sm ' +
                                            (window.location.href.indexOf(config.routes.admin.dashboard) !== -1
                                                ? 'opacity-75'
                                                : 'text-blueGray-300')
                                        }
                                    ></i>{' '}
                                    Dashboard
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link
                                    className={
                                        'text-xs uppercase py-3 font-bold block ' +
                                        (window.location.href.indexOf(config.routes.admin.brands.home) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to={config.routes.admin.brands.home}
                                >
                                    <i
                                        className={
                                            'fa-brands fa-blogger-b mr-2 text-sm ' +
                                            (window.location.href.indexOf(config.routes.admin.brands.home) !== -1
                                                ? 'opacity-75'
                                                : 'text-blueGray-300')
                                        }
                                    ></i>{' '}
                                    Brands
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        'text-xs uppercase py-3 font-bold block ' +
                                        (window.location.href.indexOf(config.routes.admin.stations.home) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to={config.routes.admin.stations.home}
                                >
                                    <i
                                        className={
                                            'fa-solid fa-warehouse mr-2 text-sm ' +
                                            (window.location.href.indexOf(config.routes.admin.stations.home) !== -1
                                                ? 'opacity-75'
                                                : 'text-blueGray-300')
                                        }
                                    ></i>{' '}
                                    Stations
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        'text-xs uppercase py-3 font-bold block ' +
                                        (window.location.href.indexOf(config.routes.admin.vehicles.home) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to={config.routes.admin.vehicles.home}
                                >
                                    <i
                                        className={
                                            'fa-solid fa-car mr-2 text-sm ' +
                                            (window.location.href.indexOf(config.routes.admin.vehicles.home) !== -1
                                                ? 'opacity-75'
                                                : 'text-blueGray-300')
                                        }
                                    ></i>{' '}
                                    Vehicles
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        'text-xs uppercase py-3 font-bold block ' +
                                        (window.location.href.indexOf(config.routes.admin.contracts.home) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to={config.routes.admin.contracts.home}
                                >
                                    <i
                                        className={
                                            'fa-solid fa-file-contract mr-2 text-sm ' +
                                            (window.location.href.indexOf(config.routes.admin.contracts.home) !== -1
                                                ? 'opacity-75'
                                                : 'text-blueGray-300')
                                        }
                                    ></i>{' '}
                                    Contracts
                                </Link>
                            </li>
                        </ul>
                        {admin.role === config.enums.role.superAdmin && (
                            <>
                                {/* Divider */}
                                <hr className="my-4 md:min-w-full" />
                                {/* Heading */}
                                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                                    Super Admin Pages
                                </h6>
                                {/* Navigation */}

                                <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                                    <li className="items-center">
                                        <Link
                                            className={
                                                'text-xs uppercase py-3 font-bold block ' +
                                                (window.location.href.indexOf(config.routes.admin.admins.home) !== -1
                                                    ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                                    : 'text-blueGray-700 hover:text-blueGray-500')
                                            }
                                            to={config.routes.admin.admins.home}
                                        >
                                            <i
                                                className={
                                                    'fa-solid fa-users mr-2 text-sm ' +
                                                    (window.location.href.indexOf(config.routes.admin.admins.home) !==
                                                    -1
                                                        ? 'opacity-75'
                                                        : 'text-blueGray-300')
                                                }
                                            ></i>{' '}
                                            Staff
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
