export interface User {
    id: number;
    email: string;
    nickname: string;
    createdAt?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    email: string;
    nickname: string;
    message: string;
    token: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    nickname: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}