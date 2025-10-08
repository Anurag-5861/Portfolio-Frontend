// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_HOST,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;


//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const { data } = await api.post(
//           "/refreshtoken",
//           {},
//           { withCredentials: true } 
//         );

//         if (data?.accessJWT) {
//           localStorage.setItem("token", data.accessJWT);
//           originalRequest.headers.Authorization = `Bearer ${data.accessJWT}`;
//           return api(originalRequest);
//         }
//       } catch (err) {
//         console.error("Refresh token failed so logging out...", err);
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST,
  withCredentials: true, // for HttpOnly cookies
});

// ---- REQUEST INTERCEPTOR ----
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken"); // 👈 safer than localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- RESPONSE INTERCEPTOR ----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/refreshtoken", {}, { withCredentials: true });

        if (data?.accessJWT) {
          sessionStorage.setItem("accessToken", data.accessJWT); // 👈 safer storage
          originalRequest.headers.Authorization = `Bearer ${data.accessJWT}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error("Refresh token failed so logging out...", err);
        sessionStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;