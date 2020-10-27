import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import styled from "styled-components";

import Typography from "./Typography";
import FormInput from "./FormInput";
import Button from "./Button";

const ServerFormError = styled.div`
  color: red;
  font-size: 0.775rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 550;
  padding-top: 10px;
`;

function SignInForm({ className, onSignIn, serverError, loading }) {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={yup.object({
        username: yup
          .string()
          .max(15, "must be 15 characters or less")
          .required("required"),
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

          <FormInput
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {serverError && <ServerFormError>{serverError}</ServerFormError>}

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
