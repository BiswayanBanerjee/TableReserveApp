// import React from 'react';
// import Login from '../components/Auth/Login';

// const LoginPage: React.FC = () => {
//   return <Login />;
// };

// export default LoginPage;

import React from 'react';
import Login from '../components/Auth/Login';
import PublicRoute from '../components/PublicRoute';

const LoginPage = () => {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  );
};

export default LoginPage;
