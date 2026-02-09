export interface User {
    id: number;
    email: string;
    nickname: string;
    createdAt?: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    id: number;
    email: string;
    nickname: string;
    message: string;
    accessToken: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    nickname: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

export interface RefreshResponse {
    accessToken: string;
}