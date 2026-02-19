import { useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './HomePage.module.scss';

export const HomePage = () => {
    const { user } = useAppSelector((state) => state.auth);

    console.log('유저', user)

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <h1>안녕하세요, {user?.nickname}님! 👋</h1>
                <p>Workout SNS에 오신 것을 환영합니다.</p>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2>최근 게시글</h2>
                    <p className={styles.placeholder}>게시글 기능은 곧 추가될 예정입니다.</p>
                </div>
            </div>
        </div>
    );
};