// import { useRouter } from 'next/router';
// import React from 'react';

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const router = useRouter();
//   const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

//   React.useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login'); // Redirect to login if not authenticated
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return <div>Loading...</div>; // Optional: Display a loading state while checking auth
//   }

//   return <>{children}</>;
// };

// export default PrivateRoute;


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true); // Set the authenticated state to true
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Optional: Display a loading state while checking auth
  }

  return <>{children}</>;
};

export default PrivateRoute;
