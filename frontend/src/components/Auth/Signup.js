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
//   useTheme,
// } from "@mui/material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api"; // Importing the API service

// const Signup: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     date_of_birth: "",
//     email: "",
//     otp: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     date_of_birth: "",
//     email: "",
//     password: "",
//     otp: "",
//   });
//   const [showOtp, setShowOtp] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view

//   const validateFields = () => {
//     const newErrors: any = {};

//     // Validate name (Firstname Lastname)
//     if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(formData.name)) {
//       newErrors.name = "Name must be in 'Firstname Lastname' format.";
//     }

//     // Validate date of birth (yyyy-mm-dd)
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date_of_birth)) {
//       newErrors.date_of_birth = "Date of birth must be in 'yyyy-mm-dd' format.";
//     }

//     // Validate password (at least 8 characters)
//     if (formData.password && formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long.";
//     }

//     // Validate email
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     // Validate OTP (if applicable)
//     if (otpSent && !/^\d{4,6}$/.test(formData.otp)) {
//       newErrors.otp = "OTP must be a 4-6 digit number.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0; // No errors mean the form is valid
//   };

//   // Handle form input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Toggle OTP visibility
//   const handleOtpVisibility = () => {
//     setShowOtp(!showOtp);
//   };

//   // Send signup request
//   const handleSignup = async () => {
//     if (!validateFields()) return; // Stop submission if validation fails

//     try {
//       const { name, date_of_birth, email, password } = formData;

//       // API call to send signup data
//       const response = await api.post("/auth/signup", {
//         name,
//         date_of_birth,
//         email,
//         password,
//       });

//       alert(response.data.message); // "OTP sent to email. Please verify to complete signup."
//       setOtpSent(true);
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   // Verify OTP
//   const handleVerifyOtp = async () => {
//     if (!validateFields()) return; // Stop submission if validation fails

//     try {
//       const { email, otp } = formData;

//       // API call to verify OTP
//       const response = await api.post("/auth/verify-signup-otp", { email, otp });

//       alert(response.data.message); // "User registered successfully"
//       navigate("/login"); // Navigate to login page
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//     <Container
//       maxWidth={false}
//       sx={{
//         height: "100vh",
//         alignItems: "center",
//         justifyContent: "center",
//         display: isMobile ? "block" : "flex",
//         padding: isMobile ? 2 : 0,
//       }}
//     >
//       <Grid
//         container
//         spacing={isMobile ? 0 : 2}
//         sx={{
//           height: isMobile ? "auto" : "100%",
//           boxShadow: isMobile ? "none" : 3,
//           borderRadius: isMobile ? 0 : 3,
//           overflow: "hidden",
//         }}
//       >
//         {/* Left Side - Signup Form */}
//         <Grid
//           item
//           xs={12}
//           md={5}
//           sx={{
//             padding: isMobile ? 2 : 4,
//             background: isMobile ? "#fff" : "inherit",
//             boxShadow: isMobile ? 3 : "none",
//             borderRadius: isMobile ? 2 : 0,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
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
//                 fontSize: "24px",
//                 fontStyle: "normal",
//                 fontWeight: 600,
//                 lineHeight: "110%",
//                 letterSpacing: "-0.96px",
//               }}
//             >
//               HD
//             </Typography>
//           </Box>
//           <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: "78%" , margin: "auto"}}>
//             <Typography
//               variant="h4"
//               fontWeight="bold"
//               gutterBottom
//               sx={{ fontSize: isMobile ? "25px" : "25px" }}
//             >
//               Sign up
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               mb={4}
//               sx={{ fontSize: isMobile ? "14px" : "inherit" }}
//             >
//               Sign up to enjoy the feature of HD
//             </Typography>
//             <TextField
//   label="Your Name"
//   name="name"
//   fullWidth
//   margin="normal"
//   variant="outlined"
//   value={formData.name}
//   onChange={handleChange}
//   error={!!errors.name}
//   helperText={errors.name || "Enter your first and last name"}
//   placeholder="Firstname Lastname"
// />

// <TextField
//   label="Date of Birth"
//   name="date_of_birth"
//   fullWidth
//   margin="normal"
//   variant="outlined"
//   value={formData.date_of_birth}
//   onChange={handleChange}
//   error={!!errors.date_of_birth}
//   helperText={errors.date_of_birth || "Format: YYYY-MM-DD"}
//   placeholder="YYYY-MM-DD"
//   InputProps={{
//     endAdornment: (
//       <InputAdornment position="end">
//         <CalendarTodayIcon />
//       </InputAdornment>
//     ),
//   }}
// />

// <TextField
//   label="Email"
//   name="email"
//   fullWidth
//   margin="normal"
//   variant="outlined"
//   type="email"
//   value={formData.email}
//   onChange={handleChange}
//   error={!!errors.email}
//   helperText={errors.email || "Enter a valid email address"}
//   placeholder="example@domain.com"
// />

// <TextField
//   label="Password"
//   name="password"
//   fullWidth
//   margin="normal"
//   variant="outlined"
//   type="password"
//   value={formData.password}
//   onChange={handleChange}
//   error={!!errors.password}
//   helperText={errors.password || "At least 8 characters"}
//   placeholder="Minimum 8 characters"
// />

// {otpSent && (
//   <TextField
//     label="OTP"
//     name="otp"
//     fullWidth
//     margin="normal"
//     variant="outlined"
//     type={showOtp ? "text" : "password"}
//     value={formData.otp}
//     onChange={handleChange}
//     error={!!errors.otp}
//     helperText={errors.otp || "Enter the OTP sent to your email"}
//     placeholder="4-6 digit OTP"
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <IconButton onClick={handleOtpVisibility}>
//             {showOtp ? <VisibilityOff /> : <Visibility />}
//           </IconButton>
//         </InputAdornment>
//       ),
//     }}
//   />
// )}

//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 marginY: 2,
//                 paddingY: 1.5,
//                 backgroundColor: "#367AFF",
//                 borderRadius: "10px",
//               }}
//               onClick={otpSent ? handleVerifyOtp : handleSignup}
//             >
//               {otpSent ? "Verify OTP" : "Sign up"}
//             </Button>
//           </Box>
//           <Typography
//             align="center"
//             variant="body2"
//             sx={{ fontSize: isMobile ? "14px" : "inherit" }}
//           >
//             Already have an account?{" "}
//             <Typography
//               component="span"
//               color="primary"
//               sx={{ cursor: "pointer" }}
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </Typography>
//           </Typography>
//         </Grid>

//         {/* Right Side - Image (Hidden for Mobile) */}
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
//       </Grid>
//     </Container>
//   );
// };

// export default Signup;













import { useState } from "react";
import { useRouter } from "next/router";
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
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    email: "",
    otp: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    date_of_birth: "",
    email: "",
    password: "",
    otp: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view

  const validateFields = () => {
    const newErrors = {};

    // Validate name (Firstname Lastname)
    if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(formData.name)) {
      newErrors.name = "Name must be in 'Firstname Lastname' format.";
    }

    // Validate date of birth (yyyy-mm-dd)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date_of_birth)) {
      newErrors.date_of_birth = "Date of birth must be in 'yyyy-mm-dd' format.";
    }

    // Validate password (at least 8 characters)
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate OTP (if applicable)
    if (otpSent && !/^\d{4,6}$/.test(formData.otp)) {
      newErrors.otp = "OTP must be a 4-6 digit number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // No errors mean the form is valid
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle OTP visibility
  const handleOtpVisibility = () => {
    setShowOtp(!showOtp);
  };

  // Send signup request
  const handleSignup = async () => {
    if (!validateFields()) return; // Stop submission if validation fails

    try {
      const { name, date_of_birth, email, password } = formData;

      // API call to send signup data
      const response = await api.post("/auth/signup", {
        name,
        date_of_birth,
        email,
        password,
      });

      alert(response.data.message); // "OTP sent to email. Please verify to complete signup."
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!validateFields()) return; // Stop submission if validation fails

    try {
      const { email, otp } = formData;

      // API call to verify OTP
      const response = await api.post("/auth/verify-signup-otp", { email, otp });

      alert(response.data.message); // "User registered successfully"
      router.push("/login"); // Navigate to login page
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: isMobile ? "block" : "flex",
        padding: isMobile ? 2 : 0,
      }}
    >
      <Grid
        container
        spacing={isMobile ? 0 : 2}
        sx={{
          height: isMobile ? "auto" : "100%",
          boxShadow: isMobile ? "none" : 3,
          borderRadius: isMobile ? 0 : 3,
          overflow: "hidden",
        }}
      >
        {/* Left Side - Signup Form */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            padding: isMobile ? 2 : 4,
            background: isMobile ? "#fff" : "inherit",
            boxShadow: isMobile ? 3 : "none",
            borderRadius: isMobile ? 2 : 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
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
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "110%",
                letterSpacing: "-0.96px",
              }}
            >
              DineBook
            </Typography>
          </Box>
          <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: "78%" , margin: "auto"}}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: isMobile ? "25px" : "25px" }}
            >
              Sign up
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              mb={4}
              sx={{ fontSize: isMobile ? "14px" : "inherit" }}
            >
              Sign up to enjoy the feature of HD
            </Typography>
            <TextField
              label="Your Name"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || "Enter your first and last name"}
              placeholder="Firstname Lastname"
            />

            <TextField
              label="Date of Birth"
              name="date_of_birth"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.date_of_birth}
              onChange={handleChange}
              error={!!errors.date_of_birth}
              helperText={errors.date_of_birth || "Format: YYYY-MM-DD"}
              placeholder="YYYY-MM-DD"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || "Enter a valid email address"}
              placeholder="example@domain.com"
            />

            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || "At least 8 characters"}
              placeholder="Minimum 8 characters"
            />

            {otpSent && (
              <TextField
                label="OTP"
                name="otp"
                fullWidth
                margin="normal"
                variant="outlined"
                type={showOtp ? "text" : "password"}
                value={formData.otp}
                onChange={handleChange}
                error={!!errors.otp}
                helperText={errors.otp || "Enter the OTP sent to your email"}
                placeholder="4-6 digit OTP"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleOtpVisibility}>
                        {showOtp ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                marginY: 2,
                paddingY: 1.5,
                backgroundColor: "#367AFF",
                borderRadius: "10px",
              }}
              onClick={otpSent ? handleVerifyOtp : handleSignup}
            >
              {otpSent ? "Verify OTP" : "Sign up"}
            </Button>
          </Box>
          <Typography
            align="center"
            variant="body2"
            sx={{ fontSize: isMobile ? "14px" : "inherit" }}
          >
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/login")}
            >
              Login
            </Typography>
          </Typography>
        </Grid>

        {/* Right Side - Image (Hidden for Mobile) */}
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
      </Grid>
    </Container>
  );
};

export default Signup;
