import { useState } from 'react';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { PostList } from '@/features/post/components/PostList/PostList';
import { PostCreateForm } from '@/features/post/components/PostCreateForm/PostCreateForm';
import styles from './HomePage.module.scss';

export const HomePage = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>안녕하세요, {user?.nickname}님! 👋</h1>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className={styles.createButton}
                >
                    {showCreateForm ? '취소' : '게시글 작성'}
                </button>
            </div>

            {showCreateForm && (
                <div className={styles.createFormSection}>
                    <h2>새 게시글 작성</h2>
                    <PostCreateForm onSuccess={() => setShowCreateForm(false)} />
                </div>
            )}

            <div className={styles.content}>
                <PostList />
            </div>
        </div>
    );
};