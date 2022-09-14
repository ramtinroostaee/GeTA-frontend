import {useEffect} from "react";
import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import {SnackbarProvider} from 'notistack';
import {useDispatch, useSelector} from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {selectCurrLangDir} from 'app/store/i18nSlice';
import withAppProviders from './withAppProviders';
import {Auth} from './auth';
import "reusable/Form/Validations";
import {initInterceptors} from "reusable/axios";
import {hideLoader, showLoader} from "./store/LoaderSlice";
import {ToastContainer} from "react-toastify";
import {BallTriangle} from "react-loader-spinner";

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */

// axios.defaults.baseURL = "https://barname.karbaladapp.ir/";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
};

const App = () => {
  const langDirection = useSelector(selectCurrLangDir);
  const dispatch = useDispatch();

  useEffect(() => {
    initInterceptors(
      () => dispatch(showLoader()),
      () => dispatch(hideLoader())
    );
  }, []);

  return (
    <>
      <OtherComponents/>
      <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
        <Auth>
          <BrowserRouter>
            <FuseAuthorization>
              <FuseTheme>
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  classes={{
                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                  }}
                >
                  <FuseLayout/>
                </SnackbarProvider>
              </FuseTheme>
            </FuseAuthorization>
          </BrowserRouter>
        </Auth>
      </CacheProvider></>
  );
};

const OtherComponents = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <>
      <ToastContainer
        style={{top: "8rem"}}
        position="top-left"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className={`w-screen h-screen bg-grey-50 fixed z-1301 opacity-25 ${
          isLoading ? "visible" : "invisible"
        }`}
      />
      <BallTriangle
        wrapperClass="fixed top-1/2 right-1/2 z-1301"
        height="100"
        width="100"
        color="grey"
        ariaLabel="loading"
        visible={isLoading}
      />
    </>
  );
};

export default withAppProviders(App)();
