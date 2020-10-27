import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Typography from "./Typography";
import FormInput from "./FormInput";
import Button from "./Button";

function SignInForm({ className, onSignIn, serverError, loading }) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yup.object({
        email: yup.string().email("invalid email address").required("required"),
        password: yup
          .string()
          .max(6, "must be 6 characters or less")
          .required("required"),
      })}
      onSubmit={(values) => {
        onSignIn(values);
      }}
    >
      {(formik) => (
        <Form className={className} onSubmit={formik.handleSubmit}>
          <Typography fontWeight={550} variant="h4">
            Sign in
          </Typography>
          {/* <Typography variant="body2">or use your account</Typography> */}

          <FormInput id="email" name="email" type="email" placeholder="Email" />
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {serverError && <div className="form-error">{serverError}</div>}

          {!loading ? (
            <Button
              variant="secondary"
              type="submit"
              marginTop="1.17rem"
              disabled={!formik.isValid}
            >
              Sign in
            </Button>
          ) : (
            <Button
              variant="secondary"
              type="submit"
              marginTop="1.17rem"
              disabled={true}
            >
              Loading...
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
