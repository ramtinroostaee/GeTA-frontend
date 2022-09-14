import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.baseURL = "https://barname.karbaladapp.ir/";
axios.defaults.headers.common.Authorization = `Bearer 195|Y3OEfdAnrZTUeJAHlEnXhE20rKv26NKPDBEMecXb`;

export const apiCallTry = async (fu) => {
  try {
    return await fu();
  } catch (error) {
    if (error.response) {
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};

export const initInterceptors = (showLoader, hideLoader) => {
  axios.interceptors.request.use(
    (req) => {
      showLoader();
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log(response)
      hideLoader();
      return response;
    },
    (err) => {
      hideLoader();
      return Promise.reject(err);
    }
  );
};
