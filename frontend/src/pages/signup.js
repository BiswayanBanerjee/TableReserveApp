// import React from "react";
// import Signup from "../components/Auth/Signup";

// const SignupPage: React.FC = () => {
//   return <Signup />;
// };

// export default SignupPage;

import Signup from "../components/Auth/Signup";
import PublicRoute from '../components/PublicRoute';

const SignupPage = () => {
  return (
    <PublicRoute>
      <Signup />
    </PublicRoute>
  );
};

export default SignupPage;
