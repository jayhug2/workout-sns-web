import { useState } from 'react';
import { useDeletePostMutation } from '../../postApi';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { Modal } from '@/shared/components/Modal/Modal';
import { PostEditForm } from "@/features/post/components/PostEditForm/PostEditForm.tsx";
import type { PostResponse } from '../../types/post.types';
import styles from './PostItem.module.scss';

interface PostItemProps {
    post: PostResponse;
    onCommentClick?: (postId: number) => void;
}


export const PostItem = ({ post, onCommentClick }: PostItemProps) => {
    const { user } = useAppSelector((state) => state.auth);
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const isAuthor = user?.id === post.userId;
    const firstLine = post.content.split('\n')[0];
    const isContentLong = post.content !== firstLine;
    const displayContent = isExpanded ? post.content : firstLine;

    const handleDelete = async () => {
        if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
        try {
            await deletePost(post.id).unwrap();
        } catch (error) {
            console.error('삭제 실패:', error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    return (
        <article className={styles.postItem}>
            <div className={styles.header}>
                <div className={styles.author}>
                    <span className={styles.nickname}>{post.userNickName}</span>
                    <span className={styles.date}>
                        {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                </div>
                {isAuthor && (
                    <div className={styles.actions}>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className={styles.editButton}
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={styles.deleteButton}
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>

            {post.imageUrls.length > 0 && (
                <div className={styles.imageSlider}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${post.imageUrls[currentImageIndex]}`}
                            alt={`게시글 이미지 ${currentImageIndex + 1}`}
                        />
                        {post.imageUrls.length > 1 && (
                            <>
                                {currentImageIndex > 0 && (
                                    <button
                                        className={`${styles.sliderButton} ${styles.sliderButtonPrev}`}
                                        onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                                    >
                                        ‹
                                    </button>
                                )}
                                {currentImageIndex < post.imageUrls.length - 1 && (
                                    <button
                                        className={`${styles.sliderButton} ${styles.sliderButtonNext}`}
                                        onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                                    >
                                        ›
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    {post.imageUrls.length > 1 && (
                        <div className={styles.indicators}>
                            {post.imageUrls.map((_, index) => (
                                <span
                                    key={index}
                                    className={`${styles.indicator} ${index === currentImageIndex ? styles.indicatorActive : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className={styles.contentArea}>
                <span className={styles.nickname}>{post.userNickName}</span>
                {' '}
                <span className={styles.content}>
                    {displayContent}
                    {isContentLong && !isExpanded && (
                        <>
                            {'... '}
                            <button
                                className={styles.moreButton}
                                onClick={() => setIsExpanded(true)}
                            >
                                더 보기
                            </button>
                        </>
                    )}
                </span>
            </div>

            <div className={styles.footer}>
                <button className={styles.actionButton}>
                    🤍 {post.likeCount}
                </button>
                <button
                    className={styles.actionButton}
                    onClick={() => onCommentClick?.(post.id)}
                >
                    💬 {post.commentCount}
                </button>
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="게시글 수정"
            >
                <PostEditForm
                    post={post}
                    onSuccess={() => setIsEditModalOpen(false)}
                />
            </Modal>
        </article>
    );
};