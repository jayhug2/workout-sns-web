import { useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './FeedPage.module.scss';

export const FeedPage = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>피드</h1>
                <p>팔로우한 사용자들의 게시글을 확인하세요</p>
            </div>

            <div className={styles.content}>
                <div className={styles.placeholder}>
                    <p>피드 기능은 곧 추가될 예정입니다.</p>
                </div>
            </div>
        </div>
    );
};