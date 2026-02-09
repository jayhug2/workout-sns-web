import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { SigninPage } from '@/features/auth/pages/SigninPage.tsx';
import {SignupPage} from "@/features/auth/pages/SignupPage.tsx";
import {PrivateRoute} from "@/shared/components/PrivateRoute.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: (
                    <PrivateRoute>
                        <div>홈 페이지 (임시)</div>
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: '/signin',
        element: <SigninPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />
    }
]);