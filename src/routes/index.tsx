import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import {SignupPage} from "@/features/auth/pages/SignupPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <div>홈 페이지 (임시)</div>,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />
    }
]);