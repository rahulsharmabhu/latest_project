import axios from "axios";
import config from "../../config";

const ax = axios.create({ baseURL: config.CORE_API_BASE_URL });

export async function sendRequest(requestType, endPoint, payload) {
  try {
    let res;
    switch (requestType) {
      case 'GET':
        res = await ax.get(endPoint);
        break;
      case 'POST':
        res = await ax.post(endPoint, payload);
        break;
      case 'PUT':
        res = await ax.put(endPoint, payload);
        break;
      case 'DELETE':
        res = await ax.delete(endPoint, {
          headers: {
            "Content-Type": "application/json"
          },
          data: payload
        });
        break;
    }
    if (res && res.status >= 200 && res.status < 300 && res.data.status) {
      return res.data;
    } else {
    }
    // throw new Error(res.data.error || res.statusText);
  } catch (error) {
    throw error;
  }
}

// Add a request interceptor
ax.interceptors.request.use(function (config) {
  const data = JSON.parse(localStorage.getItem('th-app-auth-user'));

  if (data && data.token) {
    config.headers.Authorization = `Bearer ${data.token}`
  } else {
    config.headers = {
      "Accept": "application/json",
    }
  }

  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
ax.interceptors.response.use(function (response) {

  // if (response.status === 401)
  //   window.location.href = "/auth/login"

  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log("error", error && error.response && error.response.status)
  if (error && error.response && error.response.status === 401) {
    localStorage.removeItem('th-app-auth-user');
    window.location.href = "/auth/login";
  }
  return Promise.reject(error);
});