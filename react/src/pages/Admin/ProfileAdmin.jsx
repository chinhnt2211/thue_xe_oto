import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';


function ProfileAdmin() {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const admin = useSelector((sate) => sate.auth.admin);
    const avatar = useSelector((sate) => sate.auth.avatar);
    const path = import.meta.env.VITE_API_VERSION + '/admins/' + admin.id.toString();

    const [images, setImages] = useState([]);
    const [locationDefault, setLocationDefault] = useState([]);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: typeToken + ' ' + accessToken,
                    },
                };

                const location = await httpRequest.get(path + '/location', options);
                const images = await httpRequest.get(path + '/images', options);
                setLocationDefault(location.data);
                setImages(images.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi(path);
    }, []);

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mt-10 mb-6 shadow-xl rounded-lg ">
            <div className="px-40">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 flex justify-center">
                        <div className="relative  w-[150px] h-[150px]">
                            <img
                                alt="..."
                                src={avatar}
                                className="shadow-xl w-full h-full rounded-full align-middle border-none absolute -mt-10 object-cover  "
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">{admin.full_name}</h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{' '}
                        {locationDefault &&
                            locationDefault.address +
                                ',  ' +
                                locationDefault.ward +
                                ',  ' +
                                locationDefault.district +
                                ',  ' +
                                locationDefault.city}
                    </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-left">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                            <div className="mb-2 text-blueGray-600 ">
                                <i class="fa-solid fa-at mr-2 text-lg  text-blueGray-400"></i>
                                Email:
                                <span className="ml-2 font-bold">{admin.email}</span>
                            </div>
                            <div className="mb-2 text-blueGray-600 ">
                                <i class="fa-solid fa-user mr-2 text-lg  text-blueGray-400"></i>
                                Quyền:
                                <span className="ml-2 font-bold">
                                    {admin.role == config.enums.role.admin ? 'Admin' : 'Super Admin'}
                                </span>
                            </div>
                            <div className="mb-2 text-blueGray-600 ">
                                <i class="fa-solid fa-id-card mr-2 text-lg  text-blueGray-400"></i>
                                CCCD:
                                <span className="ml-2 font-bold">{admin.cic_number}</span>
                            </div>
                            <div className="mb-2 text-blueGray-600 ">
                                <i class="fa-solid fa-id-card mr-2 text-lg  text-blueGray-400"></i>
                                Điện thoại:
                                <span className="ml-2 font-bold">{admin.phone}</span>
                            </div>
                            <div className="mb-2 text-blueGray-600 ">
                                <i class="fa-solid fa-venus-mars mr-2 text-lg  text-blueGray-400"></i>
                                Giới tính:
                                <span className="ml-2 font-bold">
                                    {admin.gender == config.enums.gender.male ? 'Nam' : 'Nữ'}
                                </span>
                            </div>
                            <div className="mb-2 text-blueGray-600 ">
                                <i class="fa-solid fa-cake-candles mr-2 text-lg  text-blueGray-400"></i>
                                Ngày sinh:
                                <span className="ml-2 font-bold">{admin.dob}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                        <span className="mb-10 uppercase font-bold text-blueGray-600">Ảnh căn cước</span>
                        {images
                            .filter((image) => {
                                if (image.type == config.enums.image.avatar) {
                                    return false;
                                }
                                return true;
                            })
                            .map((image, index) => (
                                <div
                                    key={index}
                                    className=" mb-6 bg-white rounded shadow-md dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <img className="rounded-t w-full h-auto" src={image.link} alt="" />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileAdmin;
