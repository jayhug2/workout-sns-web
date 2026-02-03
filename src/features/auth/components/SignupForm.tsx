// features/auth/components/SignupForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SubmitEvent } from 'react';
import { useSignupMutation } from '../authApi';
import type { SignupRequest } from '../types/auth.types';
import styles from './SignupForm.module.scss';
import {validatePassword} from "@/shared/utils/validation.ts";

export const SignupForm = () => {
    const [formData, setFormData] = useState<SignupRequest>({
        email: '',
        password: '',
        nickname: '',
    });
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [signup, { isLoading, error }] = useSignupMutation();
    const navigate = useNavigate();

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value });

        if (value) {
            const validation = validatePassword(value);
            setPasswordError(validation.isValid ? '' : validation.message);
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            setPasswordError(passwordValidation.message);
            return;
        }


        // 비밀번호 확인 검증
        if (formData.password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }


        // 닉네임 길이 검증 (백엔드와 동일)
        if (formData.nickname.length < 2 || formData.nickname.length > 20) {
            alert('닉네임은 2~20자 사이여야 합니다.');
            return;
        }

        try {
            await signup(formData).unwrap();
            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            navigate('/login');
        } catch (err) {
            console.error('회원가입 실패:', err);
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
                <label htmlFor="nickname">닉네임</label>
                <input
                    id="nickname"
                    type="text"
                    placeholder="닉네임을 입력하세요 (2~20자)"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    required
                    minLength={2}
                    maxLength={20}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">비밀번호</label>
                <input
                    id="password"
                    type="password"
                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}  // ← 이거!
                    required
                />
                {passwordError && (
                    <span className={styles.fieldError}>{passwordError}</span>
                )}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="passwordConfirm">비밀번호 확인</label>
                <input
                    id="passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                />
            </div>

            {error && (
                <div className={styles.error}>
                    회원가입에 실패했습니다. 입력 정보를 확인해주세요.
                </div>
            )}

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? '가입 중...' : '회원가입'}
            </button>
        </form>
    );
};