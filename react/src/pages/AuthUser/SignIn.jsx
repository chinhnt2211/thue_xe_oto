import { Link } from 'react-router-dom';
import config from '@/config';

// console.log(cx);
function SignIn() {
    return (
        <div>
            <div
                className="relative py-[210px]
                before:absolute before:inset-0 before:w-full before:h-[100%] before:bg-[url(https://pbs.twimg.com/media/EuNUwQmVkAI9HMk?format=jpg&name=4096x4096)] before:bg-cover"
            >
                <div className="relative container m-auto px-6 text-gray-500 md:px-12 lg:px-40 max-w-[1280px]">
                    <div className="m-auto space-y-8 md:w-8/12 lg:w-full">
                        <div className="rounded-xl bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">
                            <div className="lg:grid lg:grid-cols-2">
                                <div className="p-8 sm:p-14">
                                    <h2 className="mb-8 text-3xl text-cyan-900 font-bold">Đăng nhập </h2>
                                    <form action="" className="mt-10 dark:text-white">
                                        <div className="flex flex-col items-start">
                                            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                                <input
                                                    id=""
                                                    type="email"
                                                    placeholder="Email"
                                                    className="w-full bg-transparent pb-3 border-0 border-b shadow-none border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                                                />
                                            </div>
                                            <p className="h-[45px] p-[10px] pt-[5px] italic text-red-600 text-sm">
                                                *Email bi sai roi
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                                <input
                                                    id=""
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    className="w-full bg-transparent pb-3   border-0 border-b shadow-none border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                                                />
                                            </div>
                                            <p className="h-[45px] p-[10px] pt-[5px] italic text-red-600 text-sm">
                                                *Email bi sai roi
                                            </p>
                                            <button type="reset" className="-mr-3 w-max p-3">
                                                <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                                                    Quên mật khẩu ?
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center py-3 px-6 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                                                <span className="text-base font-semibold text-white dark:text-gray-900">
                                                    Đăng nhập
                                                </span>
                                            </button>
                                            <p className="border-t pt-6 text-sm mt-[32px]">
                                                Bạn chưa có tài khoản ?
                                                <Link to={config.routes.auth.signUp} className="text-sky-500">
                                                    Đăng ký
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                                <div className="rounded-lg lg:block" hidden>
                                    <img
                                        src={
                                            'https://i.pinimg.com/originals/39/40/1c/39401cffd5016c1a2ba761417b3cee14.jpg'
                                        }
                                        className="rounded-r-xl object-cover w-full max-h-[550px]"
                                        loading="lazy"
                                        alt="music mood"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
