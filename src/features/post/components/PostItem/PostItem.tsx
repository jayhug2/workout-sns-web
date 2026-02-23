import { useDeletePostMutation } from '../../postApi';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import type { PostResponse } from '../../types/post.types';
import styles from './PostItem.module.scss';

interface PostItemProps {
    post: PostResponse;
}

export const PostItem = ({ post }: PostItemProps) => {
    const { user } = useAppSelector((state) => state.auth);
    const [deletePost, { isLoading }] = useDeletePostMutation();

    const isAuthor = user?.id === post.userId;

    console.log('user?.id:', user?.id);
    console.log('post.userId:', post.userId);
    console.log('isAuthor:', isAuthor);

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
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className={styles.deleteButton}
                    >
                        삭제
                    </button>
                )}
            </div>

            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.content}>{post.content}</p>

            {post.imageUrls.length > 0 && (
                <div className={styles.images}>
                    {post.imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={`${import.meta.env.VITE_API_BASE_URL}${url}`}
                            alt={`게시글 이미지 ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <span>❤️ {post.likeCount}</span>
                <span>💬 {post.commentCount}</span>
            </div>
        </article>
    );
};