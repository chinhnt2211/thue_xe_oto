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
import { StationCombobox, UploadAdminsImages, LocationForm } from '@/components/Forms';

function AdminStore() {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const path = import.meta.env.VITE_API_VERSION + '/admins';
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [adminId, setAdminId] = useState(0);
    const [stationId, setStationId] = useState(0);
    const [role, setRole] = useState(config.enums.role.admin);
    const [isFormLocation, setIsFormLocation] = useState(false);
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

        let dataPost = { ...data, role: role };
        if (role === config.enums.role.admin) {
            dataPost = { ...dataPost, station_id: stationId };
        }

        httpRequest
            .post(path, dataPost, options)
            .then((response) => {
                setAdminId(response.data.id);
                setIsFormLocation(true);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <>
            {/* Create Station */}
            {(!isFormImages && !isFormLocation) && (
                <form onSubmit={handleSubmit(handleStore)}>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Th??m nh??n vi??n </h6>
                                <div>
                                    <Link to={config.routes.admin.admins.home}>
                                        <button
                                            className="text-blueGray-700 border hover:bg-gray-50 font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Quay L???i
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-lightBlue-500 text-white hover:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Ti???p theo
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
                                Th??ng tin nh??n vi??n
                            </h6>
                            <div className="flex flex-wrap ">
                                <InputWrapper label="H??? v?? t??n">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('full_name', {
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                            maxLength: { value: 255, message: 'D??? li???u qu?? gi???i h???n ????? d??i' },
                                            pattern: {
                                                value: config.regex.regexName,
                                                message: 'D??? li???u kh??ng h???p l???',
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
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                            min: { value: 1, message: 'D??? li???u qu?? gi???i h???n' },
                                            maxLength: { value: 255, message: 'D??? li???u qu?? gi???i h???n ????? d??i' },
                                            pattern: {
                                                value: config.regex.regexEmail,
                                                message: 'D??? li???u kh??ng h???p l???',
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
                                <InputWrapper label="??i???n tho???i">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('phone', {
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                            maxLength: { value: 15, message: 'D??? li???u qu?? gi???i h???n ????? d??i' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'D??? li???u kh??ng h???p l???',
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
                                <InputWrapper label="M???t kh???u">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('password', {
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                            maxLength: { value: 255, message: 'D??? li???u qu?? gi???i h???n ????? d??i' },
                                            pattern: {
                                                value: config.regex.regexPassword,
                                                message: 'D??? li???u kh??ng h???p l???',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="password"
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
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                            maxLength: { value: 20, message: 'D??? li???u qu?? gi???i h???n ????? d??i' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'D??? li???u kh??ng h???p l???',
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
                                <InputWrapper label="Ng??y sinh">
                                    <input
                                        type="date"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('dob', {
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="dob"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="Gi???i t??nh">
                                    <>
                                        <input
                                            defaultChecked={true}
                                            {...register('gender')}
                                            type="radio"
                                            value={config.enums.gender.male}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Nam
                                        </span>
                                        <input
                                            {...register('gender')}
                                            type="radio"
                                            value={config.enums.gender.female}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            N???
                                        </span>
                                    </>
                                </InputWrapper>
                                <InputWrapper label="Quy???n">
                                    <>
                                        <input
                                            defaultChecked={true}
                                            onClick={(e) => {
                                                setRole(parseInt(e.target.value));
                                            }}
                                            type="radio"
                                            value={config.enums.role.admin}
                                            name="role"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Admin
                                        </span>
                                        <input
                                            onClick={(e) => {
                                                setRole(parseInt(e.target.value));
                                            }}
                                            type="radio"
                                            value={config.enums.role.superAdmin}
                                            name="role"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Super Admin
                                        </span>
                                    </>
                                </InputWrapper>

                                {role === config.enums.role.admin && (
                                    <StationCombobox
                                        getStationId={(station) => {
                                            setStationId(station.id);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* Create Location */}
            {isFormLocation && (
                <LocationForm
                    id={adminId}
                    path={path}
                    setIsComplete={(value) => {
                        if (value) {
                            setIsFormImages(true);
                            setIsFormLocation(false);
                        }
                    }}
                />
            )}

            {/* Create Images */}
            {isFormImages && (
                <UploadAdminsImages
                    pathBase={path}
                    id={adminId}
                    setIsComplete={(value) => {
                        if (value) {
                            navigate(config.routes.admin.admins.home);
                        }
                    }}
                />
            )}
        </>
    );
}

export default AdminStore;
