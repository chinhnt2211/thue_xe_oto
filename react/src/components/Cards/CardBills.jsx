import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';
import { useDebounce } from '@/hooks';

// Components
import { Pagination } from '@/components/Pagination';
import { TableDropdown } from '@/components/Dropdowns';

export default function CardAdmins({ color }) {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const [path, setPath] = useState(import.meta.env.VITE_API_VERSION + '/bills');
    const [data, setData] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [meta, setMeta] = useState({
        per_page: 0,
        total: 0,
        count: 0,
        last_page: 0,
        current_page: 0,
    });
    const [links, setLinks] = useState({
        first_page_url: null,
        last_page_url: null,
        next_page_url: null,
        prev_page_url: null,
    });

    useEffect(() => {
        if (startDate == null && endDate == null) {
            setPath(import.meta.env.VITE_API_VERSION + '/bills');
        } else if (startDate != null && endDate == null) {
            setPath(import.meta.env.VITE_API_VERSION + '/bills?start_date=' + startDate);
        } else if (startDate == null && endDate != null) {
            setPath(import.meta.env.VITE_API_VERSION + '/bills?end_date=' + endDate);
        } else {
            setPath(import.meta.env.VITE_API_VERSION + '/bills?start_date=' + startDate + '&' + 'end_date=' + endDate);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const options = {
                    headers: {
                        Authorization: typeToken + ' ' + accessToken,
                    },
                };
                const result = await httpRequest.get(path, options);
                setData(result.data);
                setMeta(result.meta.page);
                setLinks(result.links);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi(path);
    }, [path]);

    const formatDate = (inputDate) => {
        let date, month, year;

        year = inputDate.substr(0, 4);
        month = inputDate.substr(5, 2);
        date = inputDate.substr(8, 2);

        return `${date}/${month}/${year}`;
    };
    return (
        <div>
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
                                Thông tin giao dịch
                            </h3>
                        </div>
                        <div className="md:flex flex-row flex-wrap items-center lg:ml-auto mr-3">
                            <div className="relative flex w-full flex-wrap items-stretch">
                                <span className="block text-blueGray-600 text-xs font-bold mb-2">Ngày bắt đầu</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (e.target.value > endDate) {
                                            setEndDate(e.target.value);
                                        }
                                    }}
                                    className="border border-gray-300  text-black px-3 py-3 placeholder-blueGray-300 relative  bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full"
                                />
                            </div>
                        </div>
                        <div className="md:flex flex-row flex-wrap items-center lg:ml-auto mr-3">
                            <div className="relative flex w-full flex-wrap items-stretch">
                                <span className="block text-blueGray-600 text-xs font-bold mb-2">Ngày kết thúc</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        if (e.target.value < startDate) {
                                            setEndDate(startDate);
                                        } else {
                                            setEndDate(e.target.value);
                                        }
                                    }}
                                    className="border border-gray-300  text-black px-3 py-3 placeholder-blueGray-300 relative  bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full"
                                />
                            </div>
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
                                    ID Hợp đồng
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    ID nhân viên
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Loại giao dịch
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Số tiền
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Ngày
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((each, index) => (
                                <tr key={index}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link
                                                to={
                                                    config.routes.admin.contracts.home +
                                                    '/' +
                                                    each.contract_id.toString()
                                                }
                                            >
                                                {each.contract_id}
                                            </Link>
                                        </span>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link
                                                to={
                                                    config.routes.admin.contracts.home +
                                                    '/' +
                                                    each.contract_id.toString()
                                                }
                                            >
                                                {each.admin_id}
                                            </Link>
                                        </span>
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {each.type == config.enums.exchange.pay && (
                                            <span className={'ml-3 ' + 'text-green-500 font-bold'}>Thanh toán</span>
                                        )}
                                        {each.type == config.enums.exchange.refund && (
                                            <span className={'ml-3 ' + 'text-red-600 font-bold'}>Hoàn trả</span>
                                        )}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            {each.type == config.enums.exchange.pay && (
                                                <span className={'ml-3 ' + 'text-green-500 font-bold'}>
                                                    {each.total}
                                                </span>
                                            )}
                                            {each.type == config.enums.exchange.refund && (
                                                <span className={'ml-3 ' + 'text-red-600 font-bold'}>{each.total}</span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            {formatDate(each.created_at)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                meta={meta}
                links={links}
                setPath={(value) => {
                    setPath(value);
                }}
            />
        </div>
    );
}

CardAdmins.defaultProps = {
    color: 'light',
};

CardAdmins.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']),
};
