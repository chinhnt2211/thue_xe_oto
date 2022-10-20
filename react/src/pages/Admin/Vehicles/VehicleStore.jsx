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
import { StationCombobox, BrandCombobox, UploadVehicleImages } from '@/components/Forms';

function VehicleStore() {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const path = import.meta.env.VITE_API_VERSION + '/vehicles';
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [vehicleId, setVehicleId] = useState(0);
    const [stationId, setStationId] = useState(0);
    const [brandId, setBrandId] = useState(0);
    const [isFormImages, setIsFormImages] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'submit', criteriaMode: 'firstError' });

    const handleStore = (data) => {
        const options = {
            headers: {
                Authorization: typeToken + ' ' + accessToken,
            },
        };
        httpRequest
            .post(path, { ...data, station_id: stationId, brand_id: brandId }, options)
            .then((response) => {
                setVehicleId(response.data.id);
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
                                <h6 className="text-blueGray-700 text-xl font-bold">Thêm phương tiện</h6>
                                <div>
                                    <Link to={config.routes.admin.vehicles.home}>
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

                        {/* Message Erros */}
                        <AlertErrors
                            errorMessage={errorMessage}
                            setErrorMessage={(value) => {
                                setErrorMessage(value);
                            }}
                        />

                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Thông tin phương tiện
                            </h6>
                            <div className="flex flex-wrap ">
                                <InputWrapper label="Tên">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('name', {
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
                                        name="name"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Chỗ ngồi">
                                    <input
                                        type="number"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('seating_capacity', {
                                            required: 'Không được để trống',
                                            min: { value: 1, message: 'Dữ liệu quá giới hạn' },
                                            max: { value: 100, message: 'Dữ liệu quá giới hạn' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="seating_capacity"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Mô tả">
                                    <textarea
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('description', {
                                            required: 'Không được để trống',
                                            pattern: {
                                                value: config.regex.regexName,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="description"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Biển số xe">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('license_number', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 15, message: 'Dữ liệu quá giới hạn độ dài' },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="license_number"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Giá xe">
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
                                <InputWrapper label="Giá thuê xe">
                                    <input
                                        type="number"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('rent_price', {
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
                                        name="rent_price"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Phí phạt">
                                    <input
                                        type="number"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('fine', {
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
                                        name="fine"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>

                                <StationCombobox
                                    getStationId={(station) => {
                                        setStationId(station.id);
                                    }}
                                />
                                <BrandCombobox
                                    getBrandId={(station) => {
                                        setBrandId(station.id);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            )}
            {isFormImages && (
                <UploadVehicleImages
                    pathBase={path}
                    id={vehicleId}
                    setIsComplete={(value) => {
                        if (value) {
                            navigate(config.routes.admin.vehicles.home);
                        }
                    }}
                />
            )}
        </>
    );
}

export default VehicleStore;
