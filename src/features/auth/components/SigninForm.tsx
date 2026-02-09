import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { SubmitEvent } from "react";
import { useSigninMutation } from '../authApi';
import { setCredentials } from '../authSlice';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import type { SignInRequest } from '../types/auth.types';
import styles from './SignInForm.module.scss';

export const SigninForm = () => {
    const [formData, setFormData] = useState<SignInRequest>({
        email: '',
        password: '',
    });

    const [signin, { isLoading, error }] = useSigninMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await signin(formData).unwrap();
            dispatch(setCredentials(result));
            navigate('/');
        } catch (err) {
            console.error('로그인 실패:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="email">이메일</label>
                <input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">비밀번호</label>
                <input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
            </div>

            {error && (
                <div className={styles.error}>
                    로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
                </div>
            )}

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? '로그인 중...' : '로그인'}
            </button>

            <div className={styles.footer}>
                <span>계정이 없으신가요?</span>
                <Link to="/signup">회원가입</Link>
            </div>
        </form>
    );
};