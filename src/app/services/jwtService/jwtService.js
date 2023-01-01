import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import {apiCallTry} from "reusable/axios";
// import jwtDecode from "jwt-decode";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.request.use((req) => {
      req.time = {startTime: new Date()};
      return req;
    }, (err) => {
      return Promise.reject(err);
    });

    axios.interceptors.response.use((response) => {
      response.config.time.endTime = new Date();
      response.duration = response.config.time.endTime - response.config.time.startTime;
      console.log(response);
      return response;
    }, (err) => {
      return new Promise(() => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized response, logout the user
          this.emit("onAutoLogout", "Invalid access_token");
          this.setSession(null);
        }
        throw err;
      });
    });
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      apiCallTry(() => axios.post("/auth/register", data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      }));
    });
  };

  signInWithUsernameAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      axios.post('/auth/login/', {
        username, password,
      }).then((the) => {
        const response = _.cloneDeep(the.data.response);
        console.log(response);
        if (response.data.user) {
          const theUser = {
            data: {...response.data.user, displayName: response.data.user?.username},
            loginRedirectUrl: "/courses",
            role: ["user"]
          };

          this.setSession(response.data.access_token);
          this.setUserInfo(theUser);

          resolve(theUser);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      return this.getUserInfo() ? resolve(this.getUserInfo()) : reject();
    });
  };

  updateUserData = (user) => {
    return axios.post("/api/auth/user/update", {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
  };
  setUserInfo = (userInfo) => userInfo ? localStorage.setItem("user_info", JSON.stringify(userInfo)) : localStorage.removeItem("user_info");

  logout = () => {
    // axios.post("api/auth/logout");
    this.setSession();
    this.setUserInfo();
  };

  isAuthTokenValid = () => {
    // if (!access_token) {
    //   return false;
    // }
    // const decoded = jwtDecode(access_token);
    // const currentTime = Date.now() / 1000;
    // if (decoded.exp < currentTime) {
    //   console.warn("access token expired");
    //   return false;
    // }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("token");
  };
  getUserInfo = () => {
    return JSON.parse(window.localStorage.getItem("user_info"));
  };
}

const instance = new JwtService();

export default instance;
