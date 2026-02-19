import { useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>프로필</h1>
                <p>{user?.nickname}님의 프로필</p>
            </div>

            <div className={styles.content}>
                <div className={styles.profileCard}>
                    <div className={styles.profileInfo}>
                        <h2>{user?.nickname}</h2>
                        <p className={styles.email}>{user?.email}</p>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>0</span>
                            <span className={styles.statLabel}>게시글</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>0</span>
                            <span className={styles.statLabel}>팔로워</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>0</span>
                            <span className={styles.statLabel}>팔로잉</span>
                        </div>
                    </div>
                </div>

                <div className={styles.placeholder}>
                    <p>상세 프로필 기능은 곧 추가될 예정입니다.</p>
                </div>
            </div>
        </div>
    );
};