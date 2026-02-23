export interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
    userNickName: string;
    imageUrls: string[];
    likeCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface PostCreateRequest {
    title: string;
    content: string;
    imageIds?: number[];
}

export interface PostResponse {
    id: number;
    title: string;
    content: string;
    userId: number;
    userNickName: string;
    imageUrls: string[];
    likeCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
}


export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export interface ImageUploadResponse {
    id: number;
    originalFilename: string;
    storedFilename: string;
    fileSize: number;
    contentType: string;
}

export type PostListResponse = PageResponse<PostResponse>;