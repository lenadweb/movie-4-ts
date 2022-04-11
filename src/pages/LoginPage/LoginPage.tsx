import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { saveToken } from 'helpers/authHelper';
import LoginForm from 'components/forms/AuthForms/LoginForm/LoginForm';
import Diamonds from 'components/layout/Diamonds/Diamonds';
import styles from './LoginPage.module.css';
import useAuth from '../../hooks/useAuth';
import RegistrationForm from '../../components/forms/AuthForms/RegistrationForm/RegistrationForm';
import { useLoginMutation, useRegistrationMutation } from '../../api/BaseApi';

type LoginResponseType = {
    'access_token': string;
}

const LoginPage: FC = () => {
    const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
    const [registration, { isLoading: isRegLoading, error: regError }] = useRegistrationMutation();
    const isAuth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const onLoginHandler = async (username: string, password: string, stayInSystem: boolean): Promise<void> => {
        try {
            const { data } : any = await login({
                username,
                password,
            });
            if (stayInSystem) saveToken(data.token);
        } catch (e) {
            console.log('Ошибка авторизации');
        }
    };

    const onRegHandler = async (username: string, email: string, password: string): Promise<void> => {
        try {
            const { data } : any = await registration({
                username,
                password,
                email,
            });
            if (data) navigate('/login');
        } catch (e) {
            console.log('Ошибка авторизации');
        }
    };

    useEffect(() => {
        if (isAuth) navigate('/map');
    }, [isAuth, navigate]);

    console.log(location);

    return (
        <div className={styles.wrapper}>
            <div className={cn(styles.inner)}>
                <div className={cn(styles.form, {
                    [styles.formLoading]: isRegLoading || isLoginLoading,
                })}
                >
                    {
                        location.pathname.includes('registration') ? <RegistrationForm onSubmit={onRegHandler} error={regError} />
                            : <LoginForm onSubmit={onLoginHandler} error={loginError} />
                    }

                </div>
            </div>
            <div className={styles.diamonds}>
                <Diamonds />
            </div>
        </div>
    );
};

export default LoginPage;