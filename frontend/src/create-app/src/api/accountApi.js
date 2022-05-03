import axios from 'axios';

var token;
const apiEndpoint = 'http://localhost:3001';
const apiConfig = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const getToken = () => {
  return token;
}

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

export const addProduct = (product) => new Promise((resolve, reject) => {
    axios.post(`${apiEndpoint}/land/`, product, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
          console.log(product);
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
    axios.post(`${apiEndpoint}/session/`, info, apiConfig)
        .then(x => {
          token = x.data;
          resolve(x.data);
          setLogin('success');
        })
        .catch(x => {
          setLogin('failed');
          reject(x);
        });
});

export const editUser = (username, params) => new Promise((resolve, reject) =>{
  axios.put(`${apiEndpoint}/user/${username}`, params, apiConfig)
  .then(x => resolve(x.data))
  .catch(x => {
    alert(x);
    reject(x);
  });
});

export const getUserInfo = () => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/session/`, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        });
});
