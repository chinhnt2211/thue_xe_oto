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

function BrandDetail() {
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
    const path = import.meta.env.VITE_API_VERSION + '/brands/' + id.toString();
    const [errorMessage, setErrorMessage] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [isNameEdit, setIsNameEdit] = useState(false);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const result = await httpRequest.get(path);
                setValue('name', result.data.name);
            } catch (error) {
                console.log(error);
                navigate(config.routes.admin.brands.home);
            }
        };
        fetchApi(path);
    }, [id, path]);

    const handleChange = (data) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': typeToken + ' ' + accessToken,
            },
        };

        httpRequest
            .patch(path, data, options)
            .then((response) => {
                navigate(config.routes.admin.brands.home);
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
                            <Link to={config.routes.admin.brands.home}>
                                <button
                                    className="text-blueGray-700 border hover:bg-gray-50 font-bold mr-3 uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Quay Lại
                                </button>
                            </Link>
                            {isEdit && (
                                <button
                                    className="bg-lightBlue-500 text-white hover:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Lưu
                                </button>
                            )}
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
                            <div className="flex">
                                <input
                                    type="text"
                                    disabled={!isNameEdit}
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
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsNameEdit(!isNameEdit);
                                        setIsEdit(true);
                                    }}
                                    className="ml-2 px-3 shadow bg-white inline-flex items-center rounded-md border-r-0"
                                >
                                    <i className="fa-solid fa-pen-to-square text-blueGray-700 text-lg"></i>
                                </button>
                            </div>
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
                    </div>
                </div>
            </div>
        </form>
    );
}

export default BrandDetail;
