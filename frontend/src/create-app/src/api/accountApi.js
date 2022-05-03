import axios from 'axios';

const token = '';
const apiEndpoint = 'http://localhost:3001';
const apiConfig = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const getProductById = (productId) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/land/${productId}`, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getProducts = (params) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if (params) {
        _apiConfig.params = params;
    }

    axios.get(`${apiEndpoint}/land`, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const addReview = (productId, review) => new Promise((resolve, reject) => {
    axios.post(`${apiEndpoint}/land/${productId}`, review, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const register = (user) => new Promise((resolve, reject) => {
    axios.post(`${apiEndpoint}/user/`, user, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const login = (info, setLogin) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/session/`, info, apiConfig)
        .then(x => {
          token = x;
          setLogin('Success');
        })
        .catch(x => {
          setLogin('failed');
          console.log(x);
          reject(x);
        });
});

export const getUserInfo = (token) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/session/`, token, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});
