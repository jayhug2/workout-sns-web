import { Link, useLocation } from 'react-router-dom';
import styles from './BottomTabBar.module.scss';

export const BottomTabBar = () => {
    const location = useLocation();

    const tabs = [
        { path: '/', label: '홈', icon: '🏠' },
        { path: '/feed', label: '피드', icon: '📱' },
        { path: '/profile', label: '프로필', icon: '👤' },
    ];

    return (
        <nav className={styles.tabBar}>
            {tabs.map((tab) => (
                <Link
                    key={tab.path}
                    to={tab.path}
                    className={`${styles.tab} ${location.pathname === tab.path ? styles.active : ''}`}
                >
                    <span className={styles.icon}>{tab.icon}</span>
                    <span className={styles.label}>{tab.label}</span>
                </Link>
            ))}
        </nav>
    );
};