import config from '@/config';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/features/authSlice';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import * as httpRequest from '@/utils/httpRequest';
// components
import { AlertErrors } from '@/components/Alerts';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'submit', criteriaMode: 'firstError' });

    const handleLogin = (data) => {
        httpRequest.default
            .get('/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                httpRequest
                    .post(import.meta.env.VITE_AUTH_VERSION + '/admin/login', data)
                    .then((response) => {
                        dispatch(login(response));
                        navigate(config.routes.admin.dashboard);
                    })
                    .catch((error) => {
                        setErrorMessage(error.response.data.message);
                    });
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };
    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-base font-bold">Đăng nhập</h6>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <AlertErrors
                                errorMessage={errorMessage}
                                setErrorMessage={(value) => {
                                    setErrorMessage(value);
                                }}
                            />
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={handleSubmit(handleLogin)}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            {...register('email', {
                                                required: 'Không được để trống',
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
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                            {...register('password', {
                                                required: 'Không được để trống',
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
                                    </div>

                                    <div className="text-center mt-6">
                                        <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-blueGray-200">
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
