import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';
import { useDebounce } from '@/hooks';

// Components
import { Pagination } from '@/components/Pagination';
import { TableDropdown } from '@/components/Dropdowns';

export default function CardVehicles({ color }) {
    const [path, setPath] = useState(import.meta.env.VITE_API_VERSION + '/vehicles');
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const  debouncedSearch = useDebounce(search, 500);

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

    
    useEffect(()=>{
        if(debouncedSearch == ''){
            setPath(import.meta.env.VITE_API_VERSION + '/vehicles');
        }else{
            setPath(import.meta.env.VITE_API_VERSION + '/vehicles?name=' + debouncedSearch);
        }
    },[debouncedSearch]);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const result = await httpRequest.get(path);
                setData(result.data);
                setMeta(result.meta.page);
                setLinks(result.links);
            } catch (error) {
                console.log(error);
                navigate(config.routes.admin.vehicles.home);
            }
        };

        fetchApi(path);
    }, [path]);
    return (
        <div>
            <Link to={config.routes.admin.vehicles.store}>
                <button
                    className={
                        'relative mb-3 border font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ' +
                        (color === 'light' ? 'bg-white text-blueGray-700' : 'bg-lightBlue-900 text-white')
                    }
                    type="button"
                >
                    Th??m
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
                                Ph????ng ti???n
                            </h3>
                        </div>
                        <form className="md:flex flex-row flex-wrap items-center lg:ml-auto mr-3">
                            <div className="relative flex w-full flex-wrap items-stretch">
                                <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    className="border border-gray-300  text-black px-3 py-3 placeholder-blueGray-300 relative  bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10"
                                />
                            </div>
                        </form>
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
                                    ID
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    T??n xe
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    H??ng Xe
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Bi???n s??? xe
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Ch??? ng???i
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Gi??
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Gi?? thu??
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }
                                >
                                    Ph?? ph???t
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
                            {data.map((each) => (
                                <tr key={each.id}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                        <span
                                            className={
                                                'ml-3 font-bold ' +
                                                +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.id}
                                            </Link>
                                        </span>
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.name}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.brand.name}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.license_number}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.seating_capacity}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.price}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.rent_price}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                'ml-3 ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            <Link to={config.routes.admin.vehicles.home + '/' + each.id.toString()}>
                                                {each.fine}
                                            </Link>
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                        <TableDropdown id={each.id} path={config.routes.admin.vehicles.home} />
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

CardVehicles.defaultProps = {
    color: 'light',
};

CardVehicles.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']),
};
