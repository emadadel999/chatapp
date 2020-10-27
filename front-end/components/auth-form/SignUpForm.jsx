import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Typography from "./Typography";
import FormInput from "./FormInput";
import Button from "./Button";

function SignUpForm({ className, onSignUp, serverError, loading }) {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={yup.object({
        name: yup
          .string()
          .max(15, "must be 15 characters or less")
          .required("required"),
        email: yup.string().email("invalid email address").required("required"),
        password: yup
          .string()
          .max(6, "must be 6 characters or less")
          .required("required"),
      })}
      onSubmit={(values) => {
        onSignUp(values);
      }}
    >
      {(formik) => (
        <Form className={className} onSubmit={formik.handleSubmit}>
          <Typography fontWeight={550} variant="h4">
            Create Account
          </Typography>
          {/* <Typography variant="body2">
            or use your email for registration
          </Typography> */}

          <FormInput id="name" name="name" type="text" placeholder="Name" />
          <FormInput id="email" name="email" type="email" placeholder="Email" />
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />

          {serverError && <div className='form-error'>{serverError}</div>}

          {!loading ? (
            <Button variant="secondary" type="submit" marginTop="1.17rem" disabled={!formik.isValid}>
              Sign up
            </Button>
          ) : (
            <Button variant="secondary" type="submit" marginTop="1.17rem" disabled={true}>Loading...</Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
