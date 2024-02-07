import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export const RequireAuth = ({ children } : { children: ReactNode}) => {
	const jwt = null;

	if (!jwt) {
		return <Navigate to='/login/auth' replace />;
	}

	return children;
}; 

