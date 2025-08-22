// import axios, { AxiosInstance } from "axios";
// import { BASE_URL } from "../../api/endpoints";
// import { getItem, setItem } from "./localStorageHelper";

// export const HTTP_CLIENT: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// export const interceptorConfig = () => {
//   HTTP_CLIENT.interceptors.request.use(
//     (config: any) => {
//       const isLoggedIn = getItem<boolean>("isLoggedIn");
//       const token = getItem<string>("token");

//       console.log("Interceptor Config:", isLoggedIn);

//       if (isLoggedIn) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (err: any) => {
//       return Promise.reject(err);
//     }
//   );

//   HTTP_CLIENT.interceptors.response.use(
//     (response: any) => {
//       return response;
//     },
//     (error: any) => {
//       console.log("HTTP Error:", error?.response || error.message);

//       if (error.response) {
//         const { status, data } = error.response;

//         // Check for 401 Unauthorized
//         if (status === 401) {
//           console.log("Unauthorized request, logging out...");

//           // Clear local storage and handle user logout
//           setItem("isLoggedIn", false);
//           setItem("token", "");

//           // Optionally, redirect the user to the login page
//           // window.location.href = "/login"; // Or use react-router's navigate

//           // Display a user-friendly message
//           alert("Your session has expired. Please log in again.");

//           return Promise.reject(data); // Reject the promise and pass the data
//         }
//       }

//       if (error.request) {
//         // The request was made but no response was received

//         console.log("Error: No response received");
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error:", error.message);
//       }

//       return Promise.reject(error);
//     }
//   );
// };

import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../api/endpoints";
import { getItem, setItem } from "./localStorageHelper";

export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const interceptorConfig = (router: any) => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      const isLoggedIn = getItem<boolean>("isLoggedIn");
      const token = getItem<string>("token");

      console.log("Interceptor Config:", isLoggedIn);

      if (isLoggedIn && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err: any) => {
      return Promise.reject(err);
    }
  );

  HTTP_CLIENT.interceptors.response.use(
    (response: any) => {
      return response; // On success, just return the response
    },
    (error: any) => {
      // Log the error details for debugging
      console.log("HTTP Error:", error?.response || error.message);

      // Check if the error has a response (the request was made and the server responded)
      if (error.response) {
        const { status, data } = error.response;

        // Check for 401 Unauthorized
        if (status === 401) {
          console.log("Unauthorized request, logging out...");

          // Clear local storage and handle user logout
          setItem("isLoggedIn", false);
          setItem("token", "");
          router.push(`/admin/login`);

          alert("Your session has expired. Please log in again.");

          return Promise.reject(data); // Reject the promise and pass the data
        }

        // Handle other specific error statuses here
        if (status === 500) {
          alert("Something went wrong on the server. Please try again later.");
        }
      }
      // If no response was received (request was made but no response returned)
      else if (error.request) {
        console.log("No response received for the request:", error.request);
      }
      // Something else went wrong while setting up the request
      else {
        console.log("Error while setting up the request:", error.message);
      }

      // Reject the error so it can be caught by any calling code
      return Promise.reject(error);
    }
  );
};
