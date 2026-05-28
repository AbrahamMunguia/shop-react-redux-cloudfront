import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import API_PATHS from '~/constants/apiPaths';
import { useAuth } from './Auth.Context';

export const isAuthenticated = () => {
    const credentials = localStorage.getItem('basic-auth');

    if (!credentials) {
        return false;
    }

    try {
        const { username, password } = JSON.parse(credentials);

        return Boolean(username && password);
    } catch {
        return false;
    }
};



export default function AuthGuard() {
    const { authenticated } = useAuth();

    return authenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}
