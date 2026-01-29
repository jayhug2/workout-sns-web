import { LoginForm } from '../components/LoginForm';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Workout SNS</h1>
                <p className={styles.subtitle}>로그인하여 시작하세요</p>
                <LoginForm />
            </div>
        </div>
    );
};