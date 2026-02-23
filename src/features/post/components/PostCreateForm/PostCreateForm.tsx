import { useState } from 'react';
import type { SubmitEvent, ChangeEvent } from 'react';
import { useCreatePostMutation, useUploadImageMutation } from '../../postApi';
import type { PostCreateRequest } from '../../types/post.types';
import styles from './PostCreateForm.module.scss';

interface PostCreateFormProps {
    onSuccess?: () => void;
}

export const PostCreateForm = ({ onSuccess }: PostCreateFormProps) => {
    const [formData, setFormData] = useState<PostCreateRequest>({
        title: '',
        content: '',
        imageIds: [],
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [createPost, { isLoading: isCreating, error: createError }] = useCreatePostMutation();
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);
        setImageFiles(prev => [...prev, ...fileArray]);

        // 미리보기 생성
        fileArray.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        try {
            // 1. 이미지 업로드
            const uploadedImageIds: number[] = [];
            for (const file of imageFiles) {
                const formData = new FormData();
                formData.append('file', file);
                const result = await uploadImage(formData).unwrap();
                uploadedImageIds.push(result.id);
            }

            // 2. 게시글 작성
            await createPost({
                ...formData,
                imageIds: uploadedImageIds,
            }).unwrap();

            // 3. 초기화
            setFormData({ title: '', content: '', imageIds: [] });
            setImageFiles([]);
            setImagePreviews([]);
            onSuccess?.();
        } catch (err) {
            console.error('게시글 작성 실패:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="title">제목</label>
                <input
                    id="title"
                    type="text"
                    placeholder="제목을 입력하세요 (최대 200자)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    maxLength={200}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    placeholder="내용을 입력하세요"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="images">이미지 (선택)</label>
                <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className={styles.fileInput}
                />
            </div>

            {imagePreviews.length > 0 && (
                <div className={styles.imagePreviews}>
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className={styles.previewItem}>
                            <img src={preview} alt={`미리보기 ${index + 1}`} />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className={styles.removeButton}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {createError && (
                <div className={styles.error}>
                    게시글 작성에 실패했습니다. 다시 시도해주세요.
                </div>
            )}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isCreating || isUploading}
            >
                {isCreating || isUploading ? '작성 중...' : '게시글 작성'}
            </button>
        </form>
    );
};