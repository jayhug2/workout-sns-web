/**
 * 비밀번호 검증
 * - 영문, 숫자, 특수문자 포함
 * - 최소 8자 이상
 */
export const validatePassword = (password: string): {
    isValid: boolean;
    message: string;
} => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!password) {
        return {
            isValid: false,
            message: '비밀번호를 입력해주세요.',
        };
    }

    if (password.length < 8) {
        return {
            isValid: false,
            message: '비밀번호는 최소 8자 이상이어야 합니다.',
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: '비밀번호는 영문, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다.',
        };
    }

    return {
        isValid: true,
        message: '',
    };
};