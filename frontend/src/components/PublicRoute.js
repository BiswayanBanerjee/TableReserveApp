// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// interface PublicRouteProps {
//   children: React.ReactNode;
// }

// const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);

//     if (token) {
//       router.push('/notes'); // Redirect to "/notes" if authenticated
//     }
//   }, [router]);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Optional: Display a loading state while checking auth
//   }

//   return !isAuthenticated ? <>{children}</> : null;
// };

// export default PublicRoute;



import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PublicRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      router.push('/notes'); // Redirect to "/notes" if authenticated
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optional: Display a loading state while checking auth
  }

  return !isAuthenticated ? <>{children}</> : null;
};

export default PublicRoute;
