import React, { useState } from "react";
import classes from "./SignUp.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { Post } from "../../Axios/AxiosFunctions";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    const params = {
      ...values,
      photo: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    };
    const url = BaseURL("POST/signup");
    const response = await Post(url, params, apiHeader());
    return response;
  };
  return (
    <div className={classes.loginDiv}>
      <div className={classes.loginInnerDiv}>
        <h3>SignUp</h3>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().trim().required("Required"),
            lastName: Yup.string().trim().required("Required"),
            phone: Yup.string().trim().required("Required"),
            email: Yup.string().trim().required("Required"),
            password: Yup.string().trim().required("Required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            const response = await handleSignUp(values);
            if (response !== undefined) {
              resetForm();
              navigate("/login");
            }
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
                  placeholder={"First Name"}
                  value={values?.firstName}
                  setter={handleChange}
                  isFormik={true}
                  errors={errors}
                  touched={touched}
                  name={"firstName"}
                  className={classes.input}
                />
                <Input
                  placeholder={"Last Name"}
                  value={values?.lastName}
                  setter={handleChange}
                  isFormik={true}
                  errors={errors}
                  touched={touched}
                  name={"lastName"}
                  className={classes.input}
                />
                <Input
                  type={"number"}
                  placeholder={"Phone"}
                  value={values?.phone}
                  setter={handleChange}
                  isFormik={true}
                  errors={errors}
                  touched={touched}
                  name={"phone"}
                  className={classes.input}
                />
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

export default SignUp;
