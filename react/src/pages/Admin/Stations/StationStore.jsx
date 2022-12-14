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
import { LocationForm } from '@/components/Forms';

function StationStore() {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const path = import.meta.env.VITE_API_VERSION + '/stations';
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [stationId, setStationId] = useState(2);
    const [isFormLocation, setIsFormLocation] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'submit', criteriaMode: 'firstError' });

    const handleStoreStation = (data) => {
        const options = {
            headers: {
                Authorization: typeToken + ' ' + accessToken,
            },
        };
        httpRequest
            .post(path, data, options)
            .then((response) => {
                setStationId(response.data.id);
                setIsFormLocation(true);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <>
            {/* Create Station */}
            {!isFormLocation && (
                <form onSubmit={handleSubmit(handleStoreStation)}>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Th??m tr???m xe</h6>
                                <div>
                                    <Link to={config.routes.admin.stations.home}>
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
                                Th??ng tin tr???m xe
                            </h6>
                            <div className="flex flex-wrap ">
                                <InputWrapper label="T??n">
                                    <input
                                        type="text"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('name', {
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
                                        name="name"
                                        render={({ message }) => (
                                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </InputWrapper>
                                <InputWrapper label="S???c ch???a">
                                    <input
                                        type="number"
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('capacity', {
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                            min: { value: 1, message: 'D??? li???u qu?? gi???i h???n' },
                                            max: { value: 1000, message: 'D??? li???u qu?? gi???i h???n' },
                                            pattern: {
                                                value: config.regex.regexNumber,
                                                message: 'D??? li???u kh??ng h???p l???',
                                            },
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="capacity"
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
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* Create Location */}
            {isFormLocation && (
                <LocationForm
                    id={stationId}
                    path={path}
                    setIsComplete={(value) => {
                        if (value) {
                            navigate(config.routes.admin.stations.home);
                        }
                    }}
                />
            )}
        </>
    );
}

export default StationStore;
