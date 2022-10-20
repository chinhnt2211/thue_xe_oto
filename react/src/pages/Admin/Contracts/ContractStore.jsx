import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';

// Components
import { InputWrapper } from '@/components/Forms';
import { AlertErrors } from '@/components/Alerts';
import { VehicleCombobox, UploadContractImages } from '@/components/Forms';

function ContractStore() {
    const navigate = useNavigate();
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const adminId = useSelector((sate) => sate.auth.admin.id);
    const path = import.meta.env.VITE_API_VERSION + '/contracts';
    const [errorMessage, setErrorMessage] = useState('');
    const [vehicleId, setVehicleId] = useState(0);
    const [contractId, setContractId] = useState(0);
    const [isFormImages, setIsFormImages] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: 'submit', criteriaMode: 'firstError' });

    const handleStore = (data) => {
        const options = {
            headers: {
                Authorization: typeToken + ' ' + accessToken,
            },
        };

        data = {
            ...data,
            admin_id: adminId,
            vehicle_id: vehicleId,
        };

        httpRequest
            .post(path, data, options)
            .then((response) => {
                console.log(response.data);
                setContractId(response.data.id);
                setIsFormImages(true);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <>
            {/* Create Station */}
            {!isFormImages && (
                <form onSubmit={handleSubmit(handleStore)}>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Thêm hợp đồng </h6>
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
                                        Tiếp theo
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Message Errors */}
                        <AlertErrors
                            errorMessage={errorMessage}
                            setErrorMessage={(value) => {
                                setErrorMessage(value);
                            }}
                        />

                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Thông tin hợp đồng
                            </h6>
                            <div className="flex flex-wrap ">
                                <InputWrapper label="Họ và tên người thuê">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('full_name', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 255, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexName,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="full_name"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Email">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('email', {
                                            required: 'Không được để trống',
                                            min: { value: 1, message: 'Dữ liệu quá giới hạn' },
                                            maxLength: { value: 255, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexEmail,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="email"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Điện thoại">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('phone', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 15, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="phone"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="CCCD">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('cic_number', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 20, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="cic_number"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                {/* Chon xe  */}
                                <VehicleCombobox
                                    getVehicleId={(value) => {
                                        setVehicleId(value.id);
                                        setValue('price', value.rent_price);
                                    }}
                                />
                                <InputWrapper label="Giá thuê">
                                    <input
                                        type="number"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('price', {
                                            required: 'Không được để trống',
                                            min: { value: 1, message: 'Dữ liệu quá giới hạn' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="price"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Thanh toán trước">
                                    <input
                                        type="number"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('paid', {
                                            required: 'Không được để trống',
                                            min: { value: 1, message: 'Dữ liệu quá giới hạn' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="paid"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Ngày bắt đầu">
                                    <input
                                        type="date"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('start_date', {
                                            required: 'Không được để trống',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="start_date"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Ngày kế thúc">
                                    <input
                                        type="date"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('end_date', {
                                            required: 'Không được để trống',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="end_date"
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
            )}

            {isFormImages && (
                <UploadContractImages
                    pathBase={path}
                    id={contractId}
                    setIsComplete={(value) => {
                        if (value) {
                            navigate(config.routes.admin.contracts.home);
                        }
                    }}
                />
            )}
        </>
    );
}

export default ContractStore;
