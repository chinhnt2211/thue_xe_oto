import axios from 'axios';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const put = async (path, data = {}, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const patch = async (path, data = {}, options = {}) => {
    const response = await httpRequest.patch(path, data, options);
    return response.data;
};

export const destroy = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

httpRequest.interceptors

export default httpRequest;