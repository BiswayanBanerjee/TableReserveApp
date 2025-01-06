// import React, { useState } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   Box,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Button,
//   useMediaQuery,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import api from "../../services/api";
// import { useNavigate } from "react-router-dom";
// import theme from "../../theme";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [useOtp, setUseOtp] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleToggleLoginMethod = () => {
//     setUseOtp(!useOtp);
//     setOtpSent(false);
//   };

//   const handleSendOtp = async (email: string) => {
//     try {
//       await api.post("/auth/send-otp", { email });
//       alert("OTP sent successfully to your email");
//       setOtpSent(true);
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     ...(useOtp
//       ? { otp: Yup.string().required("OTP is required") }
//       : { password: Yup.string().required("Password is required") }),
//   });

//   const formik = useFormik({
//     initialValues: { email: "", password: "", otp: "" },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         if (useOtp) {
//           const response = await api.post("/auth/verify-otp", {
//             email: values.email,
//             otp: values.otp,
//           });
//           localStorage.setItem("token", response.data.token);
//         } else {
//           const response = await api.post("/auth/login", {
//             email: values.email,
//             password: values.password,
//           });
//           localStorage.setItem("token", response.data.token);
//         }
//         // window.location.href = "/notes";
//         navigate("/notes");
//       } catch (error: any) {
//         alert(error.response?.data?.message || "Login failed");
//       }
//     },
//   });

//   return (
//     <Container
//       maxWidth={false}
//       sx={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Grid
//         container
//         spacing={2}
//         sx={{
//           height: "100%",
//           boxShadow: 3,
//           borderRadius: 3,
//           overflow: "hidden",
//           flexDirection: isMobile ? "column" : "row",
//         }}
//       >
//         {!isMobile && (
//           <Grid
//             item
//             xs={12}
//             md={7}
//             sx={{
//               backgroundImage: "url('/assets/images/signup-bg.png')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></Grid>
//         )}

//         <Grid
//           item
//           xs={12}
//           md={5}
//           sx={{
//             padding: isMobile ? 2 : 4,
//             width: isMobile ? "100%" : "auto",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: isMobile ? "center" : "flex-start",
//               marginBottom: 3,
//             }}
//           >
//             <img
//               src="/assets/images/hd-icon.png"
//               alt="HD Icon"
//               style={{ width: 32, height: 32, marginRight: 8 }}
//             />
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               sx={{
//                 color: "#232323",
//                 fontFeatureSettings: "'liga' off, 'clig' off",
//                 fontFamily: "Inter",
//                 fontSize: isMobile ? "20px" : "24px",
//                 fontWeight: 600,
//                 lineHeight: "110%",
//                 letterSpacing: "-0.96px",
//               }}
//             >
//               HD
//             </Typography>
//           </Box>

//           <Box
//             component="form"
//             noValidate
//             onSubmit={formik.handleSubmit}
//             sx={{
//               paddingLeft: isMobile ? 0 : 9,
//               paddingRight: isMobile ? 0 : 9,
//               maxWidth: "78%",
//               margin: "auto"
//             }}
//           >
//             <Typography
//               variant={isMobile ? "h5" : "h4"}
//               fontWeight="bold"
//               gutterBottom
//             >
//               Login
//             </Typography>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{ textAlign: isMobile ? "center" : "left", marginBottom: 4 }}
//             >
//               Login to access your account
//             </Typography>
//             <TextField
//               label="Email"
//               name="email"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               error={formik.touched.email && !!formik.errors.email}
//               helperText={formik.touched.email && formik.errors.email}
//             />
//             {useOtp ? (
//               otpSent ? (
//                 <TextField
//                   label="OTP"
//                   name="otp"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={formik.values.otp}
//                   onChange={formik.handleChange}
//                   error={formik.touched.otp && !!formik.errors.otp}
//                   helperText={formik.touched.otp && formik.errors.otp}
//                 />
//               ) : (
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{ marginY: 2, paddingY: 1.5 , backgroundColor: "#367AFF",
//                     borderRadius: "10px",}}
//                   onClick={() => handleSendOtp(formik.values.email)}
//                   disabled={!formik.values.email || !!formik.errors.email}
//                 >
//                   Send OTP
//                 </Button>
//               )
//             ) : (
//               <TextField
//                 label="Password"
//                 name="password"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 type={showPassword ? "text" : "password"}
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 error={formik.touched.password && !!formik.errors.password}
//                 helperText={formik.touched.password && formik.errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}
//             {otpSent || !useOtp ? (
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   marginY: 2,
//                   paddingY: 1.5,
//                   backgroundColor: "#367AFF",
//                   borderRadius: "10px",
//                 }}
//               >
//                 {useOtp ? "Verify OTP" : "Login"}
//               </Button>
//             ) : null}
//           </Box>
//           <Typography
//             align="center"
//             variant="body2"
//             sx={{ cursor: "pointer" , color: "blue"}}
//             onClick={handleToggleLoginMethod}
//           >
//             {useOtp ? "Login with Password" : "Login with OTP"}
//           </Typography>
//           <Typography
//             align="center"
//             variant="body1"
//             sx={{ cursor: "pointer", marginTop: 2 }}
//             onClick={() => navigate("/signup")}
//           >
//             Don't have an Account?{" "}
//             <span style={{ color:"blue" }}>Signup</span>
//           </Typography>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Login;




import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import theme from "../../theme";
import api from "../services/api";

const Login = () => {
  const router = useRouter();
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggleLoginMethod = () => {
    setUseOtp(!useOtp);
    setOtpSent(false);
  };

  const handleSendOtp = async (email) => {
    try {
      await api.post("/auth/send-otp", { email });
      alert("OTP sent successfully to your email");
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    ...(useOtp
      ? { otp: Yup.string().required("OTP is required") }
      : { password: Yup.string().required("Password is required") }),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "", otp: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (useOtp) {
          const response = await api.post("/auth/verify-otp", {
            email: values.email,
            otp: values.otp,
          });
          localStorage.setItem("token", response.data.token);
        } else {
          const response = await api.post("/auth/login", {
            email: values.email,
            password: values.password,
          });
          localStorage.setItem("token", response.data.token);
        }
        router.push("/dashboard");
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: "100%",
          boxShadow: 3,
          borderRadius: 3,
          overflow: "hidden",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {!isMobile && (
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              backgroundImage: "url('/assets/images/signup-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Grid>
        )}

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            padding: isMobile ? 2 : 4,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              marginBottom: 3,
            }}
          >
            <img
              src="/assets/images/hd-icon.png"
              alt="HD Icon"
              style={{ width: 32, height: 32, marginRight: 8 }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#232323",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily: "Inter",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 600,
                lineHeight: "110%",
                letterSpacing: "-0.96px",
              }}
            >
              DineBook
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{
              paddingLeft: isMobile ? 0 : 9,
              paddingRight: isMobile ? 0 : 9,
              maxWidth: "90%",
              margin: "auto",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="bold"
              gutterBottom
            >
              Login
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: isMobile ? "center" : "left", marginBottom: 4 }}
            >
              Login to access your account
            </Typography>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            {useOtp ? (
              otpSent ? (
                <TextField
                  label="OTP"
                  name="otp"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  error={formik.touched.otp && !!formik.errors.otp}
                  helperText={formik.touched.otp && formik.errors.otp}
                />
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    marginY: 2,
                    paddingY: 1.5,
                    backgroundColor: "#367AFF",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleSendOtp(formik.values.email)}
                  disabled={!formik.values.email || !!formik.errors.email}
                >
                  Send OTP
                </Button>
              )
            ) : (
              <TextField
                label="Password"
                name="password"
                fullWidth
                margin="normal"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {otpSent || !useOtp ? (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  marginY: 2,
                  paddingY: 1.5,
                  backgroundColor: "#367AFF",
                  borderRadius: "10px",
                }}
              >
                {useOtp ? "Verify OTP" : "Login"}
              </Button>
            ) : null}
          </Box>
          <Typography
            align="center"
            variant="body2"
            sx={{ cursor: "pointer", color: "blue" }}
            onClick={handleToggleLoginMethod}
          >
            {useOtp ? "Login with Password" : "Login with OTP"}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            sx={{ cursor: "pointer", marginTop: 2 }}
            onClick={() => router.push("/signup")}
          >
            Don&apos;t have an Account?{" "}
            <span style={{ color: "blue" }}>Signup</span>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;



