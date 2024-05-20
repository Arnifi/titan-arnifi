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
import { Button } from "@mui/material";
import { FormikValues } from "formik";
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

  const handleLogin = (values: FormikValues): void => {
    console.log(values, "submit");
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
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      width: "150px",
                      textTransform: "none",
                    }}
                  >
                    Login
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
