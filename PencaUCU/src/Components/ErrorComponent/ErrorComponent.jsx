import React from 'react';
import { Navigate } from 'react-router-dom';

const ErrorComponent = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ErrorComponent;
