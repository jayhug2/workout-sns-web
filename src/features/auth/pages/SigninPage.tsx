import { SigninForm } from '../components/SigninForm.tsx';
import styles from './SigninPage.module.scss';

export const SigninPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Workout SNS</h1>
                <p className={styles.subtitle}>로그인하여 시작하세요</p>
                <SigninForm />
            </div>
        </div>
    );
};