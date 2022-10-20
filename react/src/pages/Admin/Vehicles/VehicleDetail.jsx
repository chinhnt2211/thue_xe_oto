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
import { StationCombobox, BrandCombobox, UpdateVehicleImages } from '@/components/Forms';

function VehicleDetail() {
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
    const path = import.meta.env.VITE_API_VERSION + '/vehicles/' + id.toString();
    const [errorMessage, setErrorMessage] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const [stationId, setStationId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [stationDefaultId, setStationDefaultId] = useState(null);
    const [brandDefaultId, setBrandDefaultId] = useState(null);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const vehicle = await httpRequest.get(path);
                setValue('name', vehicle.data.name);
                setValue('status', vehicle.data.status);
                setValue('description', vehicle.data.description);
                setValue('seating_capacity', vehicle.data.seating_capacity);
                setValue('license_number', vehicle.data.license_number);
                setValue('price', vehicle.data.price);
                setValue('rent_price', vehicle.data.rent_price);
                setValue('fine', vehicle.data.fine);
                setStationDefaultId(vehicle.data.station.id);
                setBrandDefaultId(vehicle.data.brand.id);
            } catch (error) {
                console.log(error);
                navigate(config.routes.admin.vehicles.home);
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

        httpRequest
            .patch(
                path,
                {
                    ...data,
                    brand_id: brandId,
                    station_id: stationId,
                },
                options,
            )
            .then((response) => {
                setIsEdit(false);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(handleChange)}>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">Thông tin phương tiện</h6>
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
                                    className="bg-lightBlue-500 text-white hover:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="submit"
                                    onClick={(e) => {
                                        if (!isEdit) {
                                            setIsEdit(true);
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    {isEdit ? 'Lưu' : 'Chỉnh sửa '}
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
                            <InputWrapper label="Tên">
                                <input
                                    type="text"
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                                setDefaultStationId={stationDefaultId}
                                isEdit={isEdit}
                                getStationId={(station) => {
                                    setStationId(station.id);
                                }}
                            />

                            <BrandCombobox
                                setDefaultBrandId={brandDefaultId}
                                isEdit={isEdit}
                                getBrandId={(brand) => {
                                    setBrandId(brand.id);
                                }}
                            />
                        </div>
                        
                    </div>
                </div>
            </form>
            <UpdateVehicleImages id={id} />
        </div>
    );
}

export default VehicleDetail;
