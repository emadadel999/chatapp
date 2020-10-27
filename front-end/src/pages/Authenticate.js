// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as yup from "yup";
// import { connect, useSelector, useDispatch } from "react-redux";

// import Card from "../shared/UI-Elements/Card";
// import "./Authenticate.css";
// import FormInput from "../shared/FormElements/FormInput";
// import SubmitButton from "../shared/FormElements/SubmitButton";
// import Button from "../shared/UI-Elements/Button";
// import {
//   fetchLoginRequest,
//   fetchRegisterRequest,
// } from "../shared/util/redux/actions/actionCreators";
// import { useHistory } from "react-router-dom";


// .authentication__header {
//     color: white;
//     text-align: center;
//   }
  
//   .authentication {
//     width: 90%;
//     max-width: 25rem;
//     margin: 7rem auto;
//     text-align: center;
//   }
  
//   .authentication form {
//     margin-bottom: 1rem;
//   }
  
//   .signUpTitleContainer {
//     display: flex;
//     flex-direction: row;
//     align-items: flex-start
//   }
  
//   .signUpTitle {
//     width: 60%;
//     display: flex;
//     justify-content: end;
//   }
  
//   .switchButtonContainer {
//     display: flex;
//     justify-content: end;
//     width: 40%;
//   }





// // const Authenticate = (props) => {
// //   const [isSignUpMode, setSignUpSwitch] = useState(false);
// //   const history = useHistory();
// //   const { isFetching, isLoggedIn, error } = useSelector(
// //     (state) => state.authReducer
// //   );
// //   const dispatch = useDispatch();

// //   const signUpSwitchHandler = (switcher) => {
// //     setSignUpSwitch(!switcher);
// //   };

// //   return (
// //     <Card className="authentication">
// //       <Formik
// //         initialValues={{
// //           name: isSignUpMode ? "" : undefined,
// //           email: "",
// //           password: "",
// //         }}
// //         validationSchema={yup.object({
// //           name: isSignUpMode
// //             ? yup
// //                 .string()
// //                 .max(15, "Must be 15 characters or less")
// //                 .required("Required")
// //             : undefined,
// //           email: yup
// //             .string()
// //             .email("Invalid email address")
// //             .required("Required"),
// //           password: yup
// //             .string()
// //             .max(6, "Must be 6 characters or less")
// //             .required("Required"),
// //         })}
// //         onSubmit={(values) => {
// //           if (isSignUpMode) dispatch(fetchRegisterRequest(values, history));
// //           else dispatch(fetchLoginRequest(values, history));
// //         }}
// //       >
// //         {(formik) => (
// //           <>
// //             <div className="signUpTitleContainer">
// //               <h2 className="signUpTitle">
// //                 {isSignUpMode ? "Register" : "Sign in"}
// //               </h2>
// //               <div className="switchButtonContainer">
// //                 <Button onClick={() => signUpSwitchHandler(isSignUpMode)}>
// //                   {isSignUpMode ? "or Log In?" : "or Sign up?"}
// //                 </Button>
// //               </div>
// //             </div>
// //             <Form onSubmit={formik.handleSubmit}>
// //               {isSignUpMode && (
// //                 <FormInput
// //                   label="Name"
// //                   name="name"
// //                   type="text"
// //                   placeholder="insert your name..."
// //                 />
// //               )}

// //               <FormInput
// //                 label="Email"
// //                 name="email"
// //                 type="email"
// //                 placeholder="insert your email..."
// //               />

// //               <FormInput
// //                 label="Password"
// //                 name="password"
// //                 type="password"
// //                 placeholder="insert your password..."
// //               />

// //               {error && <div>{error}</div>}

// //               {!isFetching ? (
// //                 <SubmitButton type="submit" disabled={!formik.isValid}>
// //                   Submit
// //                 </SubmitButton>
// //               ) : (
// //                 <SubmitButton disabled={true}>Loading...</SubmitButton>
// //               )}
// //             </Form>
// //           </>
// //         )}
// //       </Formik>
// //     </Card>
// //   );
// // };

// export default Authenticate;
