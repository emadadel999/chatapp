import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

import Typography from "./Typography";
import Button from "./Button";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import theme from "./Theme";

const Root = styled.div`
  background: ${theme.color.greyLight};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
`;

const Container = styled.div`
  background-color: ${theme.color.white};
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  text-align: center;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: ${theme.transition.base({ el: "all", speed: "0.6" })};
`;

const ShowSignUpContainer = keyframes`
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: ${(props) => (props.signUpActive ? 5 : 1)};
  transform: ${(props) =>
    props.signUpActive ? "translateX(100%)" : "translateX(0)"};
  opacity: ${(props) => (props.signUpActive ? 1 : 0)};
  animation: ${(props) =>
    props.signUpActive
      ? css`
          ${ShowSignUpContainer} 0.6
        `
      : "none"};
`;

const SignInContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: 2;
  transform: ${(props) =>
    props.signUpActive ? "translateX(100%)" : "translateX(0)"};
`;

const StyledForm = css`
  background-color: ${theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const SignUpFormStyled = styled(SignUpForm)`
  ${StyledForm}
`;

const SignInFormStyled = styled(SignInForm)`
  ${StyledForm}
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: ${theme.transition.base({ el: "transform", speed: "0.6" })};
  z-index: 100;
  transform: ${(props) =>
    props.signUpActive ? "translateX(-100%)" : "translateX(0)"};
`;

const Overlay = styled.div`
  background: #ff416c;
  background: linear-gradient(to right, #9965f4 20%, #0000d6 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: ${(props) =>
    props.signUpActive ? "translateX(50%)" : "translateX(0)"};
  transition: ${theme.transition.base({ el: "transform", speed: "0.6" })};
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: "translateX(0)";
  transition: ${theme.transition.base({ el: "transform", speed: "0.6" })};
`;

const OverlayPanelLeft = styled(OverlayPanel)`
  transform: ${(props) =>
    props.signUpActive ? "translateX(-0)" : "translateX(-20%)"};
`;

const OverlayPanelRight = styled(OverlayPanel)`
  right: 0;
  transform: ${(props) =>
    props.signUpActive ? "translateX(20%)" : "translateX(0)"};
`;

const AuthForm = ({ onSignUp, onSignIn, serverError, loading }) => {
  const [signUpActive, setsignUp] = useState(false);
  const toggleSignPanel = () => {
    setsignUp((prevSignUp) => !prevSignUp);
  };


  return (
    <Root>
      <Container>
        {signUpActive ? (
          <SignUpContainer signUpActive={signUpActive}>
            <SignUpFormStyled
              onSignUp={onSignUp}
              serverError={serverError}
              loading={loading}
            />
          </SignUpContainer>
        ) : (
          <SignInContainer signUpActive={signUpActive}>
            <SignInFormStyled
              onSignIn={onSignIn}
              serverError={serverError}
              loading={loading}
            />
          </SignInContainer>
        )}

        <OverlayContainer signUpActive={signUpActive}>
          <Overlay signUpActive={signUpActive}>
            {signUpActive ? (
              <OverlayPanelLeft signUpActive={signUpActive}>
                <Typography fontWeight={550} variant="h4" color="white">
                  Register now!
                </Typography>
                <Typography variant="body" color="white">
                  Enter your personal details and start journey with us
                </Typography>
                <Button
                  onClick={toggleSignPanel}
                  variant="transparent"
                  marginTop="1.17rem"
                >
                  Sign In
                </Button>
              </OverlayPanelLeft>
            ) : (
              <OverlayPanelRight signUpActive={signUpActive}>
                <Typography fontWeight={550} variant="h4" color="white">
                  Welcome Back!
                </Typography>
                <Typography variant="body" color="white">
                  Please login with your personal info
                </Typography>
                <Button
                  onClick={toggleSignPanel}
                  variant="transparent"
                  marginTop="1.17rem"
                >
                  Sign Up
                </Button>
              </OverlayPanelRight>
            )}
          </Overlay>
        </OverlayContainer>
      </Container>
    </Root>
  );
};

export default AuthForm;
