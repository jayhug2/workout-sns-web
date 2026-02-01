import { SignupForm } from '../components/SignupForm';
import { Link } from 'react-router-dom';
import styles from './SignupPage.module.scss';

export const SignupPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.signupBox}>
                <h1 className={styles.title}>Workout SNS</h1>
                <p className={styles.subtitle}>새로운 계정 만들기</p>
                <SignupForm />
                <div className={styles.footer}>
                    <span>이미 계정이 있으신가요?</span>
                    <Link to="/login">로그인</Link>
                </div>
            </div>
        </div>
    );
};