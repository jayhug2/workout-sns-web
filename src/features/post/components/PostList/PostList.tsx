import { useGetPostsQuery } from '../../postApi';
import { PostItem } from '../PostItem/PostItem';
import styles from './PostList.module.scss';

export const PostList = () => {
    const { data, isLoading, error } = useGetPostsQuery({ page: 0, size: 10 });

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>게시글을 불러오는 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    게시글을 불러오는데 실패했습니다.
                </div>
            </div>
        );
    }

    if (!data || data.content.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>
                    아직 게시글이 없습니다.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {data.content.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>

            {/* 페이징 정보 (나중에 무한 스크롤 or 페이지네이션 추가) */}
            <div className={styles.pagination}>
                <p>
                    전체 {data.totalElements}개 중 {data.content.length}개 표시
                </p>
            </div>
        </div>
    );
};