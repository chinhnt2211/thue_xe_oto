import { useState } from 'react';
import { useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';

import * as httpRequest from '@/utils/httpRequest';
import { AlertErrors } from '@/components/Alerts';

function UploadAdminsImages({ pathBase, id, setIsComplete }) {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const [errorMessage, setErrorMessage] = useState('');
    const [images, setImages] = useState([]);
    const path = pathBase + '/' + id + '/images';

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        if (images.length !== 3) {
            setErrorMessage('List of photos must be 3');
        } else {
            for (let i = 0; i < images.length; i++) {
                data.append('images[]', images[i].file);
            }

            const options = {
                headers: {
                    Authorization: typeToken + ' ' + accessToken,
                },
            };
            httpRequest
                .post(path, data, options)
                .then((response) => {
                    setIsComplete(true);
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.message);
                });
        }
    };

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const maxNumber = 3;
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" id="imageForm">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Thêm nhân viên</h6>
                        <div>
                            <button
                                className="bg-lightBlue-500 text-white hover:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Tiếp theo
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
                                <span className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Thêm ảnh (1: Ảnh đại diện, 2: Ảnh CCCD mặt trước, 3: Ảnh CCCD mặt sau)
                                </span>
                                {/* <input
                                        onChange={handleChange}
                                        className="block w-full text-lg text-gray-900 bg-gray-50 rounded border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpeg"
                                        multiple
                                    /> */}
                                <ImageUploading
                                    multiple
                                    value={images}
                                    maxNumber={maxNumber}
                                    onChange={onChange}
                                    dataURLKey="data_url"
                                    acceptType={['jpg', 'png', 'jpeg', 'gif']}
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        dragProps,
                                    }) => (
                                        <div className="upload__image-wrapper">
                                            <button
                                                type="button"
                                                className="flex justify-center items-center w-full"
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                <div
                                                    htmlFor="dropzone-file"
                                                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                >
                                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                        <svg
                                                            aria-hidden="true"
                                                            className="mb-3 w-10 h-10 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                            ></path>
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">Click to upload</span> or
                                                            drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            PNG, JPG, JPEG or GIF
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                            {/* </button> */}
                                            <button
                                                onClick={onImageRemoveAll}
                                                type="button"
                                                className="my-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center "
                                            >
                                                Xóa tât cả
                                                <i className="ml-2 fa-solid fa-trash-can"></i>
                                            </button>
                                            {imageList.map((image, index) => (
                                                <div key={index}>
                                                    <span className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                        {index === 0 && 'Ảnh đại diện'}
                                                        {index === 1 && 'Ảnh CCCD mặt trước'}
                                                        {index === 2 && 'Ảnh CCCD mặt sau'}
                                                    </span>
                                                    <div className=" mb-6 bg-white rounded shadow-md dark:bg-gray-800 dark:border-gray-700">
                                                        <img
                                                            className="rounded-t w-full h-auto"
                                                            src={image.data_url}
                                                            alt=""
                                                        />
                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                onClick={() => onImageUpdate(index)}
                                                                className="w-6/12 inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-blueGray-700 rounded-bl hover:bg-blueGray-200 hover:text-black"
                                                            >
                                                                Chỉnh sửa
                                                                <i className="ml-2 fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => onImageRemove(index)}
                                                                className="w-6/12 inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-br hover:bg-red-800 "
                                                            >
                                                                Xóa
                                                                <i className="ml-2 fa-solid fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default UploadAdminsImages;
