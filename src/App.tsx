import { Outlet } from "react-router-dom";
import { useSignoutMutation } from '@/features/auth/authApi';
import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

function App() {
    const [signout] = useSignoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signout().unwrap();
            dispatch(logout());
            navigate('/signin');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <div className={"app"}>
            {/* 임시 테스트용 헤더 */}
            <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', background: '#f5f5f5' }}>
                <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    로그아웃 (테스트)
                </button>
            </header>

            <Outlet />
        </div>
    );
}

export default App; 