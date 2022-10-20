import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector } from 'react-redux';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';
// Components
import { InputWrapper } from '@/components/Forms';
import { AlertErrors } from '@/components/Alerts';

function ContractExchange() {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: 'submit', criteriaMode: 'firstError' });
    const path = import.meta.env.VITE_API_VERSION + '/contracts/' + id.toString();

    const [errorMessage, setErrorMessage] = useState('');
    const [paidDefault, setPaidDefault] = useState(0);
    const [priceDefault, setPriceDefault] = useState(0);

    const [typeExchange, setTypeExchange] = useState(config.enums.exchange.pay);
    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: typeToken + ' ' + accessToken,
                    },
                };

                const result = await httpRequest.get(path, options);
                setPaidDefault(result.data.paid);
                setPriceDefault(result.data.price);
            } catch (error) {
                console.log(error);
                navigate(config.routes.admin.contracts.home);
            }
        };
        fetchApi(path);
    }, [id, path]);

    const handleChange = (data) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: typeToken + ' ' + accessToken,
            },
        };

        data = {
            ...data,
            type: typeExchange,
        };
        httpRequest
            .post(path + '/payment', data, options)
            .then((response) => {
                console.log(response);
                navigate(config.routes.admin.contracts.home + '/' + id);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };
    return (
        <form onSubmit={handleSubmit(handleChange)}>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Thông tin hãng xe</h6>
                        <div>
                            <Link to={config.routes.admin.contracts.home}>
                                <button
                                    className="text-blueGray-700 border hover:bg-gray-50 font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Quay Lại
                                </button>
                            </Link>
                            <button
                                className="bg-lightBlue-500 text-white hover:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Thanh toán
                            </button>
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
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Thông tin chi tiết</h6>
                    <div className="flex flex-wrap ">
                        <div className="w-full lg:w-7/12 px-4 mb-4 uppercase text-blueGray-600 text-xs font-bold ">
                            {'ID: ' + id}
                        </div>

                        <InputWrapper label="Giá thuê">
                            <span className="bg-blueGray-100 border-blueGray-100 border px-3 py-3  text-black rounded-md focus:ring w-full ease-linear transition-all duration-150">
                                {priceDefault}
                            </span>
                        </InputWrapper>
                        <InputWrapper label="Đã thanh toán">
                            <span className="bg-blueGray-100 border-blueGray-100 border px-3 py-3  text-black rounded-md focus:ring w-full ease-linear transition-all duration-150">
                                {paidDefault}
                            </span>
                        </InputWrapper>
                        <InputWrapper label="Trạng thái">
                            <>
                                <input
                                    checked={config.enums.exchange.pay === typeExchange}
                                    onChange={(e) => {
                                        setTypeExchange(parseInt(e.target.value));
                                    }}
                                    type="radio"
                                    value={config.enums.exchange.pay}
                                    name="status"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Thanh toán
                                </span>
                                <input
                                    checked={config.enums.exchange.refund === typeExchange}
                                    onChange={(e) => {
                                        setTypeExchange(parseInt(e.target.value));
                                    }}
                                    type="radio"
                                    value={config.enums.exchange.refund}
                                    name="status"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Hoàn trả
                                </span>
                            </>
                        </InputWrapper>
                        <InputWrapper label="Tổng tiền">
                            <div className="flex">
                                <input
                                    type="text"
                                    className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                    {...register('total', {
                                        required: 'Không được để trống',
                                        min: { value: 1, message: 'Dữ liệu quá giới hạn' },
                                        pattern: {
                                            value: config.regex.regexNumber,
                                            message: 'Dữ liệu không hợp lệ',
                                        },
                                    })}
                                />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="total"
                                render={({ message }) => (
                                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {message}
                                    </span>
                                )}
                            />
                        </InputWrapper>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContractExchange;
