import {Link} from "react-router-dom";
import React, {useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {submitLogin} from "app/auth/store/loginSlice";
import * as yup from "yup";
import {
  TextField, Icon, InputAdornment, Button, Checkbox, Divider, FormControlLabel,
} from "@mui/material";
import {
  PASSWORD_MIN, PASSWORD_REQUIRED, USERNAME_REQUIRED,
} from "reusable/Messages";

const LoginSchema = yup.object({
  username: yup.string().required(USERNAME_REQUIRED),
  password: yup.string().required(PASSWORD_REQUIRED).min(4, PASSWORD_MIN),
});

const CSRFLoginTab = () => {
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const inputData = useMemo(() => [{
    field: "username", id: "username", label: "نام کاربری", InputProps: {
      endAdornment: (<InputAdornment position="end">
          <Icon className="text-24">person</Icon>
        </InputAdornment>),
    },
  }, {
    field: "password", id: "password", label: "رمز عبور", type: showPassword ? "text" : "password", InputProps: {
      endAdornment: (<InputAdornment position="end">
          <Icon
            onClick={() => setShowPassword((pre) => !pre)}
            className="text-24 cursor-pointer"
          >
            {showPassword ? "visibility" : "visibility_off"}
          </Icon>
        </InputAdornment>),
    },
  },], [showPassword, setShowPassword]);

  const formik = useFormik({
    initialValues: {
      username: "", password: "",
    }, validationSchema: LoginSchema, onSubmit: (values) => {
      console.log(values);
      // const deviceInfo = getDeviceInfo();
      const deviceInfo = "Windows_Chrome";
      console.log("deviceInfo", deviceInfo);

      dispatch(submitLogin({
        ...values, // remember: check ? "1" : "0",
        device: deviceInfo,
      }));
    },
  });

  // const getDeviceInfo = useCallback(() => {
  //   const platform = window.navigator.userAgentData.platform;
  //   navigator.browserInfo = (function () {
  //     let ua = navigator.userAgent;
  //     let tem;
  //     let M =
  //       ua.match(
  //         /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
  //       ) || [];
  //     if (/trident/i.test(M[1])) {
  //       tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
  //       return "IE " + (tem[1] || "");
  //     }
  //     if (M[1] === "Chrome") {
  //       tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
  //       if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
  //     }
  //     M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  //     if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  //     return M.join("_");
  //   })();
  //   const deviceInfo = `${platform}_${navigator.browserInfo}`;
  //   return deviceInfo;
  // }, []);

  const handleChange = useCallback((event) => {
    setCheck(event.target.checked);
  }, [setCheck]);

  return (<div className="w-full">
      <form
        className="flex justify-center flex-col"
        onSubmit={formik.handleSubmit}
      >
        {inputData.map((element) => {
          const field = element.field;
          const hasError = formik.touched[field] && formik.errors[field];
          return (<TextField
              key={field}
              className="mb-16"
              type="text"
              error={!!hasError}
              helperText={hasError && formik.errors[field]}
              variant="outlined"
              {...formik.getFieldProps(field)}
              {...element}
            />);
        })}

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between divStyle">
          <FormControlLabel
            className="formControl"
            control={<Checkbox
              style={{
                padding: "0", margin: "0", fontSize: "16px",
              }}
              size="small"
              checked={check}
              onChange={handleChange}
            />}
            label="مرا به خاطر بسپار"
          />

          <Link className="font-normal" to="/forgetPassword">
            فراموشی رمز عبور ؟
          </Link>
        </div>

        <div className="my-20 flex items-center justify-center">
          <Divider className="w-32"/>
          <Divider className="w-32"/>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto my-16 text-14"
          aria-label="LOG IN"
          value="legacy"
        >
          ورود
        </Button>
      </form>
    </div>);
};

export default CSRFLoginTab;
