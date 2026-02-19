import { Link, useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '@/features/auth/authApi.ts';
import { logout } from '@/features/auth/authSlice.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';
import styles from './Header.module.scss';

export const Header = () => {
    const [signout] = useSignoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

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
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    Workout SNS
                </Link>

                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink}>
                        홈
                    </Link>
                    <Link to="/feed" className={styles.navLink}>
                        피드
                    </Link>
                    <Link to="/profile" className={styles.navLink}>
                        프로필
                    </Link>
                </nav>

                <div className={styles.actions}>
                    {user && (
                        <span className={styles.username}>{user.nickname}</span>
                    )}
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        로그아웃
                    </button>
                </div>
            </div>
        </header>
    );
};