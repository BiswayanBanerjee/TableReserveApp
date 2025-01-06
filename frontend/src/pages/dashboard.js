// import React from "react";
// import Dashboard from "../components/Notes/Dashboard";

// const NotesPage: React.FC = () => {
//   return <Dashboard />;
// };

// export default NotesPage;


import Dashboard from "../components/Notes/Dashboard";
import PrivateRoute from '../components/PrivateRoute';

const dashboard = () => {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
};

export default dashboard;