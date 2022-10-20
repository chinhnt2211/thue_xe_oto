import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';

import * as httpRequest from '@/utils/httpRequest';
import { AlertErrors } from '@/components/Alerts';
import config from '@/config';

function UpdateAdminImages({ id, setIsComplete }) {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);

    const [errorMessage, setErrorMessage] = useState('');
    const [images, setImages] = useState([]);
    const [imageUploadedList, setImageUploadedList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [reload, setReload] = useState(0);
    const path = import.meta.env.VITE_API_VERSION + '/admins/' + id.toString() + '/images';

    useEffect(() => {
        const options = {
            headers: {
                Authorization: typeToken + ' ' + accessToken,
            },
        };

        httpRequest
            .get(path, options)
            .then((response) => {
                setImageUploadedList(response.data);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    }, [path]);


    const handleUpdateImage = (newImage, image, index) => {
        const pathImage = import.meta.env.VITE_API_VERSION + '/images/' + image.id.toString();
        const data = new FormData();
        const options = {
            headers: {
                Authorization: typeToken + ' ' + accessToken,
            },
        };
        data.append('image', newImage);
        httpRequest
            .post(pathImage, data, options)
            .then((response) => {
                let newImageList = imageUploadedList;
                newImageList[index]['link'] = response.data.link;
                newImageList[index]['name'] = response.data.name;
                setImageUploadedList(newImageList);
                setIsEdit(false);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <form encType="multipart/form-data" id="imageForm">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Thông tin nhân viên</h6>
                        <div>
                            <button
                                className="bg-lightBlue-500 text-white hover:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="button"
                                onClick={(e) => {
                                    setIsEdit((prev) => !prev);
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
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Ảnh nhân viên</h6>
                    <div className="flex flex-wrap ">
                        <div className="w-full lg:w-7/12 px-4">
                            <div className="relative w-full mb-3">
                                {imageUploadedList.map((image, index) => (
                                    <div key={index}>
                                        <span className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                            {index === 0 && 'Ảnh đại diện'}
                                            {index === 1 && 'Ảnh CCCD mặt trước'}
                                            {index === 2 && 'Ảnh CCCD mặt sau'}
                                        </span>
                                        <div className=" mb-6 bg-white rounded shadow-md dark:bg-gray-800 dark:border-gray-700">
                                            <img key={image} className="rounded-t w-full h-auto" src={image.link} alt="" />
                                            {isEdit && (
                                                <div className="flex">
                                                    <label
                                                        htmlFor="dropzone-file"
                                                        // type="button"
                                                        // onClick={() => handleUpdateImage(image, index)}
                                                        className="w-full inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-blueGray-700 rounded-bl hover:bg-blueGray-200 hover:text-black"
                                                    >
                                                        <input
                                                            onChange={(e) => {
                                                                handleUpdateImage(e.target.files[0], image, index);
                                                                console.log(e.target.value);
                                                            }}
                                                            id="dropzone-file"
                                                            type="file"
                                                            hidden
                                                        />
                                                        Chỉnh sửa
                                                        <i className="ml-2 fa-solid fa-pen-to-square"></i>
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default UpdateAdminImages;
