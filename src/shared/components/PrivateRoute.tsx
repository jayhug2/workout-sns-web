import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { token } = useAppSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};