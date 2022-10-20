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
import { StationCombobox, UpdateAdminImages } from '@/components/Forms';

function AdminDetail() {
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
    const path = import.meta.env.VITE_API_VERSION + '/admins/' + id.toString();
    const [errorMessage, setErrorMessage] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const [role, setRole] = useState(config.enums.role.admin);
    const [gender, setGender] = useState(config.enums.gender.male);
    const [status, setStatus] = useState(config.enums.statusAdmin.working);
    const [stationId, setStationId] = useState('');
    const [stationDefaultId, setStationDefaultId] = useState(null);
    const [emailDefault, setEmailDefault] = useState(null);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const options = {
                    headers: {
                        Authorization: typeToken + ' ' + accessToken,
                    },
                };

                const admin = await httpRequest.get(path, options);
                const location = await httpRequest.get(path + '/location', options);
                setValue('full_name', admin.data.full_name);
                setEmailDefault(admin.data.email);
                setValue('password', '');
                setValue('phone', admin.data.phone);
                setValue('cic_number', admin.data.cic_number);
                setValue('dob', admin.data.dob);
                setGender(admin.data.gender);
                setRole(admin.data.role);
                setStatus(admin.data.status);
                setValue('city', location.data.city);
                setValue('district', location.data.district);
                setValue('ward', location.data.ward);
                setValue('address', location.data.address);
                if (admin.data.role === config.enums.role.admin) {
                    setStationDefaultId(admin.data.station.id);
                }
            } catch (error) {
                console.log(error);
                navigate(config.routes.admin.admins.home);
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
            role: role,
            gender: gender,
            status: status,
        };

        if (data.password === '') {
            delete data.password;
        }
        if (role === config.enums.role.admin) {
            data = {
                ...data,
                station_id: stationId,
            };
        }
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
                            <h6 className="text-blueGray-700 text-xl font-bold">Thông tin nhân viên</h6>
                            <div>
                                <Link to={config.routes.admin.admins.home}>
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
                            <InputWrapper label="Họ và tên">
                                <input
                                    type="text"
                                    disabled={!isEdit}
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
                                <span className="bg-blueGray-100 border-blueGray-100 border px-3 py-3  text-black rounded-md focus:ring w-full ease-linear transition-all duration-150">
                                    {emailDefault}
                                </span>
                            </InputWrapper>
                            <InputWrapper label="Điện thoại">
                                <input
                                    type="text"
                                    disabled={!isEdit}
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
                            <InputWrapper label="Mật khẩu">
                                <input
                                    type="text"
                                    disabled={!isEdit}
                                    className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                    {...register('password', {
                                        maxLength: { value: 255, message: 'Dữ liệu quá giới hạn độ dài' },
                                        pattern: {
                                            value: config.regex.regexPassword,
                                            message: 'Dữ liệu không hợp lệ',
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
                                    disabled={!isEdit}
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
                            <InputWrapper label="Ngày sinh">
                                <input
                                    type="date"
                                    disabled={!isEdit}
                                    className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                    {...register('dob', {
                                        required: 'Không được để trống',
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
                            <InputWrapper label="Giới tính">
                                <>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.gender.male === gender}
                                        onClick={(e) => {
                                            setGender(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.gender.male}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Nam
                                    </span>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.gender.female === gender}
                                        onClick={(e) => {
                                            setGender(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.gender.female}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Nữ
                                    </span>
                                </>
                            </InputWrapper>
                            <InputWrapper label="Quyền">
                                <>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.role.admin === role}
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
                                        disabled={!isEdit}
                                        checked={config.enums.role.superAdmin === role}
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
                            <InputWrapper label="Trạng thái">
                                <>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.statusAdmin.working === status}
                                        onClick={(e) => {
                                            setStatus(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.statusAdmin.working}
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Đang làm việc
                                    </span>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.statusAdmin.on_leave === status}
                                        onClick={(e) => {
                                            setStatus(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.statusAdmin.on_leave}
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Nghỉ phép
                                    </span>
                                    <input
                                        disabled={!isEdit}
                                        checked={config.enums.statusAdmin.quit_job === status}
                                        onClick={(e) => {
                                            setStatus(parseInt(e.target.value));
                                        }}
                                        type="radio"
                                        value={config.enums.statusAdmin.quit_job}
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Thôi việc
                                    </span>
                                </>
                            </InputWrapper>
                            {config.enums.role.admin === role && (
                                <StationCombobox
                                    setDefaultStationId={stationDefaultId}
                                    isEdit={isEdit}
                                    getStationId={(station) => {
                                        setStationId(station.id);
                                    }}
                                />
                            )}
                        </div>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Địa chỉ chi tiết</h6>
                        <div className="flex flex-wrap ">
                            <InputWrapper label="Tỉnh, Thành phố">
                                <div className="flex">
                                    <input
                                        type="text"
                                        disabled={!isEdit}
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('city', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 255, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexName,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="city"
                                    render={({ message }) => (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {message}
                                        </span>
                                    )}
                                />
                            </InputWrapper>
                            <InputWrapper label="Huyện, Quận">
                                <div className="flex">
                                    <input
                                        type="name"
                                        disabled={!isEdit}
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('district', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 255, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexName,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="district"
                                    render={({ message }) => (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {message}
                                        </span>
                                    )}
                                />
                            </InputWrapper>
                            <InputWrapper label="Xã, Phường">
                                <div className="flex">
                                    <input
                                        type="text"
                                        disabled={!isEdit}
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('ward', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 255, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexName,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="ward"
                                    render={({ message }) => (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {message}
                                        </span>
                                    )}
                                />
                            </InputWrapper>
                            <InputWrapper label="Thôn xóm, số nhà, ...">
                                <div className="flex">
                                    <input
                                        type="text"
                                        disabled={!isEdit}
                                        className="disabled:bg-blueGray-100 disabled:border-blueGray-100 border border-gray-300 px-3 py-3  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150"
                                        {...register('address', {
                                            required: 'Không được để trống',
                                            maxLength: { value: 255, message: 'Dữ liệu quá giới hạn độ dài' },
                                            pattern: {
                                                value: config.regex.regexName,
                                                message: 'Dữ liệu không hợp lệ',
                                            },
                                        })}
                                    />
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="address"
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
            <UpdateAdminImages id={id} />
        </div>
    );
}

export default AdminDetail;
