import React, { FC } from 'react';
import cloud from 'assets/images/heart-svg-animation.svg';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import Image from 'components/media/Image/Image';
import H from 'components/type/H/H';
import Block from 'components/utils/Block/Block';
import Row from 'components/utils/Row/Row';
import { Link } from 'react-router-dom';
import styles from '../AuthForms.module.css';
import TextButton from '../../Buttons/TextButton/TextButton';
import BasicButton from '../../Buttons/BasicButton/BasicButton';
import CheckInput from '../../CheckInput/CheckInput';
import TextInput from '../../TextInput/TextInput';
import InputLabel from '../../InputLabel/InputLabel';
import InlineAlert from '../../../type/InputAlert/InlineAlert';

interface ILoginForm {
    onSubmit: (email: string, password: string, stayInSystem: boolean) => void;
    error: any;
}

const LoginForm: FC<ILoginForm> = ({ onSubmit, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors: validateErrors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            stayInSystem: true,
        },
    });

    const onSubmitHandler = ({ email, password, stayInSystem }: any): void => {
        onSubmit(email, password, stayInSystem);
    };

    return (
        <div className={cn(styles.wrapper)}>
            <form className={styles.container}>
                <Block className={styles.title}>
                    <Image src={cloud} width="100px" />
                    <H size="xl">
                        Авторизация
                    </H>
                </Block>
                <Block>
                    <InputLabel caption="Email" />
                    <TextInput
                        className={styles.textInput}
                        validate={
                            register('email', {
                                required: 'Заполните поле',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Введите корректный Email',
                                },
                            })
                        }
                    />
                    {
                        validateErrors.email
                        && <InlineAlert caption={validateErrors.email.message || ''} />
                    }
                </Block>
                <Block>
                    <Row>
                        <InputLabel caption="Пароль" />
                        <TextButton className={styles.pink} caption="Забыли пароль?" />
                    </Row>
                    <TextInput
                        className={styles.textInput}
                        type="password"
                        validate={register('password', {
                            required: 'Заполните поле',
                            minLength: {
                                value: 6,
                                message: 'Длина пароля должна быть не менее 6 символов',
                            },
                        })}
                    />
                    {
                        validateErrors.password
                        && <InlineAlert caption={validateErrors.password.message || ''} />
                    }
                </Block>
                <Block>
                    <CheckInput
                        caption="Оставаться в системе"
                        validate={register('stayInSystem')}
                    />
                </Block>
                <Block>
                    <div className={styles.textAlignCenter}>
                        {
                            error
                            && <InlineAlert caption="Ошибка авторизации" />
                        }
                    </div>
                    <BasicButton caption="Войти" onClick={handleSubmit(onSubmitHandler)} />
                </Block>
                <Block className={styles.textAlignCenter}>
                    <span>Нет аккаунта? </span>
                    <Link to="/registration">
                        <TextButton className={styles.pink} caption="Регистрация" />
                    </Link>
                </Block>
            </form>
        </div>
    );
};

export default LoginForm;
