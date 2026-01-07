
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",   // 🚀 YOUR BACKEND BASE URL
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`

      return config
    })

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      console.log(error);

      const statusCode = error.status;
      if (statusCode === 401 || statusCode === 403) {
        logout()
          .then(() => {
            navigate('/login')
          })
      }

      return Promise.reject(error);
    })

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor)
      axiosSecure.interceptors.request.eject(resInterceptor)
    }
  }, [user, logout, navigate])

  return axiosSecure;
};

export default useAxiosSecure;
