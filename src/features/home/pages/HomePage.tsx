import { useState } from 'react';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { PostList } from '@/features/post/components/PostList/PostList';
import { PostCreateForm } from '@/features/post/components/PostCreateForm/PostCreateForm';
import { Modal } from '@/shared/components/Modal/Modal';
import styles from './HomePage.module.scss';

export const HomePage = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>안녕하세요, {user?.nickname}님! 👋</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className={styles.createButton}
                >
                    게시글 작성
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="새 게시글 작성"
            >
                <PostCreateForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>

            <div className={styles.content}>
                <PostList />
            </div>
        </div>
    );
};