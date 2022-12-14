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
import { VehicleCombobox, UpdateContractImages } from '@/components/Forms';

function ContractDetail() {
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
    const [isEdit, setIsEdit] = useState(false);

    const [status, setStatus] = useState(config.enums.contracts.processing);
    const [vehicleId, setVehicleId] = useState('');
    const [adminDefaultName, setAdminDefaultName] = useState(null);
    const [paidDefault, setPaidDefault] = useState(0);
    const [vehicleDefaultId, setVehicleDefaultId] = useState(null);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const options = {
                    headers: {
                        Authorization: typeToken + ' ' + accessToken,
                    },
                };

                const contract = await httpRequest.get(path, options);

                const admin = await httpRequest.get(import.meta.env.VITE_API_VERSION + '/admins/' + contract.data.admin_id , options);

                setValue('full_name', contract.data.full_name);
                setValue('email', contract.data.email);
                setValue('phone', contract.data.phone);
                setValue('cic_number', contract.data.cic_number);
                setAdminDefaultName(admin.data.full_name);
                setVehicleDefaultId(contract.data.vehicle_id);
                setValue('price', contract.data.price);
                setPaidDefault(contract.data.paid);
                setValue('start_date', contract.data.start_date);
                setValue('end_date', contract.data.end_date);
                setStatus(contract.data.status);
                // setValue('city', location.data.city);
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
            vehicle_id: vehicleId,
            status: status,
        };

        httpRequest
            .patch(path, data, options)
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
                            <h6 className="text-blueGray-700 text-xl font-bold">Th??ng tin h???p ?????ng</h6>
                            <div>
                                <Link to={config.routes.admin.contracts.home}>
                                    <button
                                        className="text-blueGray-700 border hover:bg-gray-50 font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Quay L???i
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
                                    {isEdit ? 'L??u' : 'Ch???nh s???a '}
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
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Th??ng tin h???p ?????ng</h6>
                        <div className="flex flex-wrap ">
                            <InputWrapper label="H??? v?? t??n ng?????i thu??">
                                <input
                                    type="text"
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                                    disabled={!isEdit}
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
                            <InputWrapper label="CCCD">
                                <input
                                    type="text"
                                    disabled={!isEdit}
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
                            <InputWrapper label="Nh??n vi??n">
                                <span className="bg-blueGray-100 border-blueGray-100 border px-3 py-3  text-black rounded-md focus:ring w-full ease-linear transition-all duration-150">
                                    {adminDefaultName}
                                </span>
                            </InputWrapper>
                            {/* Chon xe  */}
                            <VehicleCombobox
                                setDefaultVehicleId={vehicleDefaultId}
                                isEdit={isEdit}
                                getVehicleId={(value) => {
                                    setVehicleId(value.id);
                                    setValue('price', value.rent_price);
                                }}
                            />
                            <InputWrapper label="Gi?? thu??">
                                <input
                                    type="number"
                                    disabled={!isEdit}
                                    className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                    {...register('price', {
                                        required: 'Kh??ng ???????c ????? tr???ng',
                                        min: { value: 1, message: 'D??? li???u qu?? gi???i h???n' },
                                        pattern: {
                                            value: config.regex.regexNumber,
                                            message: 'D??? li???u kh??ng h???p l???',
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
                            <InputWrapper label="???? thanh to??n">
                                <span className="bg-blueGray-100 border-blueGray-100 border px-3 py-3  text-black rounded-md focus:ring w-full ease-linear transition-all duration-150">
                                    {paidDefault}
                                </span>
                            </InputWrapper>
                            <InputWrapper label="Ng??y b???t ?????u">
                                <input
                                    type="date"
                                    disabled={!isEdit}
                                    className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                    {...register('start_date', {
                                        required: 'Kh??ng ???????c ????? tr???ng',
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
                            <InputWrapper label="Ng??y k??? th??c">
                                <input
                                    type="date"
                                    disabled={!isEdit}
                                    className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                    {...register('end_date', {
                                        required: 'Kh??ng ???????c ????? tr???ng',
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
                            <InputWrapper label="Tr???ng th??i">
                                <>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.contracts.processing === status}
                                        onClick={(e) => {
                                            setStatus(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.contracts.processing}
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        ??ang th???c hi???n
                                    </span>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.contracts.completed === status}
                                        onClick={(e) => {
                                            setStatus(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.contracts.completed}
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        ???? ho??n th??nh
                                    </span>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.contracts.broken === status}
                                        onClick={(e) => {
                                            setStatus(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.contracts.broken}
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        H???y b???
                                    </span>
                                </>
                            </InputWrapper>
                        </div>
                    </div>
                </div>
            </form>
            <UpdateContractImages id={id} />
        </div>
    );
}

export default ContractDetail;
