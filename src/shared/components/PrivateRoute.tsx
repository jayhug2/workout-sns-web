import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { accessToken } = useAppSelector((state) => state.auth);  // ← token → accessToken

    if (!accessToken) {  // ← token → accessToken
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
};