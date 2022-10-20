import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// components

import { TableDropdown } from '@/components/Dropdowns';

export default function CardTable({ color, title, data, tableHeader }) {
    return (
        <div>
            <Link to={config.routes.admin.brands.store}>
                <button
                    className={
                        'relative mb-3 border font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ' +
                        (color === 'light' ? 'bg-white text-blueGray-700' : 'bg-lightBlue-900 text-white')
                    }
                    type="button"
                >
                    Thêm
                </button>
            </Link>
            <div
                className={
                    'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
                    (color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    'font-semibold text-lg ' + (color === 'light' ? 'text-blueGray-700' : 'text-white')
                                }
                            >
                                {title}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Project
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    <img
                                        // src={require("assets/img/bootstrap.jpg").default}
                                        className="h-12 w-12 bg-white rounded-full border"
                                        alt="..."
                                    ></img>{' '}
                                    <span
                                        className={
                                            'ml-3 font-bold ' +
                                            +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                        }
                                    >
                                        Argon Design System
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    $2,500 USD
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <i className="fas fa-circle text-orange-500 mr-2"></i> pending
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex">
                                        <img
                                            // src={require("assets/img/team-1-800x800.jpg").default}
                                            alt="..."
                                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                        ></img>
                                        <img
                                            // src={require("assets/img/team-2-800x800.jpg").default}
                                            alt="..."
                                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                        ></img>
                                        <img
                                            // src={require("assets/img/team-3-800x800.jpg").default}
                                            alt="..."
                                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                        ></img>
                                        <img
                                            // src={require("assets/img/team-4-470x470.png").default}
                                            alt="..."
                                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                                        ></img>
                                    </div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center">
                                        <span className="mr-2">60%</span>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                                <div
                                                    style={{ width: '60%' }}
                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <TableDropdown />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

CardTable.defaultProps = {
    color: 'light',
};

CardTable.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']),
};
