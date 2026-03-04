import { useState } from 'react';
import { useUpdatePostMutation } from '../../postApi';
import type { PostResponse, PostCreateRequest } from '../../types/post.types';
import styles from './PostEditForm.module.scss';

interface PostEditFormProps {
    post: PostResponse;
    onSuccess?: () => void;
}

export const PostEditForm = ({ post, onSuccess }: PostEditFormProps) => {
    const [formData, setFormData] = useState<Pick<PostCreateRequest, 'title' | 'content'>>({
        title: post.title,
        content: post.content,
    });

    const [updatePost, { isLoading, error }] = useUpdatePostMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        try {
            await updatePost({
                id: post.id,
                data: {
                    title: formData.title,
                    content: formData.content,
                },
            }).unwrap();
            onSuccess?.();
        } catch (err) {
            console.error('게시글 수정 실패:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="edit-title">제목</label>
                <input
                    id="edit-title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    maxLength={200}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="edit-content">내용</label>
                <textarea
                    id="edit-content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    required
                />
            </div>

            {error && (
                <div className={styles.error}>
                    게시글 수정에 실패했습니다. 다시 시도해주세요.
                </div>
            )}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? '수정 중...' : '수정 완료'}
            </button>
        </form>
    );
};