import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { SigninPage } from '@/features/auth/pages/SigninPage.tsx';
import { SignupPage } from "@/features/auth/pages/SignupPage.tsx";
import { PrivateRoute } from "@/shared/components/PrivateRoute.tsx";
import { HomePage } from '@/features/home/pages/HomePage';
import { FeedPage } from '@/features/feed/pages/FeedPage';
import { ProfilePage } from '@/features/profile/pages/ProfilePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: (
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/feed',
                element: (
                    <PrivateRoute>
                        <FeedPage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/profile',
                element: (
                    <PrivateRoute>
                        <ProfilePage />
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