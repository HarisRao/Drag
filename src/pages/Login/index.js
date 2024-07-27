import React from "react";
import { Formik } from "formik";
import classes from "./Login.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { Post } from "../../Axios/AxiosFunctions";
import { useDispatch } from "react-redux";
import { saveLoginData } from "../../store/redux/authSice";

const Login = () => {
  const dispatch=useDispatch()
  const handleLogin = async (params) => {
    const url = BaseURL("POST/login");
    const response = await Post(url, params, apiHeader());
    if (response !== undefined) {
      dispatch(saveLoginData(response?.data?.data))
    }
  };
  return (
    <div className={classes.loginDiv}>
      <div className={classes.loginInnerDiv}>
        <h3>Login</h3>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string().trim().required("Required"),
            password: Yup.string().trim().required("Required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            await handleLogin(values);
            resetForm();
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Input
                  type={"email"}
                  placeholder={"email"}
                  value={values?.email}
                  setter={handleChange}
                  isFormik={true}
                  errors={errors}
                  touched={touched}
                  name={"email"}
                  className={classes.input}
                />
                <Input
                  type={"password"}
                  placeholder={"password"}
                  value={values?.password}
                  setter={handleChange}
                  isFormik={true}
                  errors={errors}
                  touched={touched}
                  name={"password"}
                  className={classes.input}
                />
                <Button
                  type={"submit"}
                  label={isSubmitting ? "Submitting..." : "Submit"}
                  disabled={isSubmitting}
                />
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
