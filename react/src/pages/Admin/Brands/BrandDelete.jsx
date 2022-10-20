import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';

// Components
import { AlertErrors } from '@/components/Alerts';

function BrandDelete() {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const { id } = useParams();
    const path = import.meta.env.VITE_API_VERSION + '/brands/' + id.toString();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = () => {
        const options = {
            headers: {
                'Authorization': typeToken + ' ' + accessToken,
            },
        };
        httpRequest
            .destroy(path, options)
            .then((response) => {
                navigate(config.routes.admin.brands.home);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Xóa hãng xe</h6>
                    <div>
                        <Link to={config.routes.admin.brands.home}>
                            <button
                                className="text-blueGray-700 border hover:bg-gray-50 font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="button"
                            >
                                Quay Lại
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Message Erros */}
            <AlertErrors
                errorMessage={errorMessage}
                setErrorMessage={(value) => {
                    setErrorMessage(value);
                }}
            />

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Bạn có muốn xóa hãng xe này không?
                    </h6>
                    <div className="flex flex-wrap ">
                        <div className=" w-full lg:w-7/12 px-4 uppercase text-blueGray-600 text-xs font-bold mb-4">
                            {'ID: ' + id}
                        </div>
                    </div>
                    <div className="flex flex-wrap ">
                        <div className=" w-full lg:w-7/12 px-4">
                            <div className="relative w-full mb-3">
                                <Link to={config.routes.admin.brands.home}>
                                    <button
                                        className="bg-white text-blueGray-700 border hover:bg-gray-50 font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Hủy
                                    </button>
                                </Link>
                                <button
                                    className="bg-red-600 text-white border hover:bg-red-700 font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BrandDelete;
