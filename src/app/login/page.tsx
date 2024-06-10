"use client";

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import theme from "@/theme";
import { imageUrls } from "@/assets/icons";
import FormProvaider from "@/components/Form";
import FormInputField, { IInputType } from "@/components/Form/AInputField";
import { LockOpen } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { FormikValues } from "formik";
import {
  ILoginResponse,
  useLoginMutation,
} from "@/lib/Redux/features/auth/authApi";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useRouter } from "next/navigation";

const ArnifiLogo =
  "https://frontend-arnifi-images.s3.me-south-1.amazonaws.com/images/ArnifiLogo.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginSide(): JSX.Element {
  const [loginInfo] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();
  console.log(
    "AWS_ACCESS_KEY_ID",
    process.env.AWS_ACCESS_KEY_ID,
    "AWS_SECRET_ACCESS_KEY",
    process.env.AWS_SECRET_ACCESS_KEY
  );
  const handleLogin = async (values: FormikValues): Promise<void> => {
    try {
      const response: { data: ILoginResponse } = await login(values).unwrap();
      if (!response?.data?.token) {
        console.error(response);
        dispatch(
          openSnackbar({
            isOpen: true,
            message: "Email or Password is incorrect",
            type: "error",
          })
        );
      } else {
        router.replace("/");
        dispatch(
          openSnackbar({
            isOpen: true,
            message: "Login Successful!",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          isOpen: true,
          message: "Email or Password is incorrect",
          type: "error",
        })
      );
    }
  };
  return (
    <Box>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundImage: `url(${imageUrls.SignUpback})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              marginY: { xs: "35px", lg: "50px" },
              marginX: { xs: "35px", lg: "100px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              component={"img"}
              src={ArnifiLogo}
              loading="lazy"
              sx={{
                height: "30px",
                transform: "scale(1.6)",
                marginLeft: "19px",
                marginBottom: "15px",
              }}
            />
            <Typography
              component="h1"
              variant="h5"
              fontSize={"30px"}
              fontWeight={"600"}
              lineHeight={"45px"}
              marginBottom={"15px"}
              color={theme.colorConstants.midnightBlue}
            >
              Welcome to Admin portal 👋
            </Typography>

            <Typography
              color={theme.colorConstants.royalBlue}
              component="h1"
              variant="h5"
              marginBottom={"20px"}
              fontSize={"30px"}
              fontWeight={"600"}
              lineHeight={"45px"}
            >
              Sign In
            </Typography>

            <Box width={"100%"}>
              <FormProvaider
                submitHandlar={handleLogin}
                initialValues={loginInfo}
                validationSchema={validationSchema}
              >
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <FormInputField
                    name="email"
                    label="Email"
                    type={IInputType.EMAIL}
                    placeholder="Please provide with your email"
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <FormInputField
                    icon={<LockOpen />}
                    name="password"
                    label="Password"
                    type={IInputType.PASSWORD}
                    placeholder="Please provide with your password"
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    marginTop: "50px",
                  }}
                >
                  <Button
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      width: "150px",
                      textTransform: "none",
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={30} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Box>
              </FormProvaider>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
