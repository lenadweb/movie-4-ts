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
import CheckInput from '../../../inputs/CheckInput/CheckInput';
import TextInput from '../../../inputs/TextInput/TextInput';
import InputLabel from '../../../inputs/InputLabel/InputLabel';
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
            username: '',
            password: '',
            stayInSystem: true,
        },
    });

    const onSubmitHandler = ({ username, password, stayInSystem }: any): void => {
        onSubmit(username, password, stayInSystem);
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
                    <InputLabel caption="Имя пользователя" />
                    <TextInput
                        className={styles.textInput}
                        validate={
                            register('username', {
                                required: 'Заполните поле',
                                pattern: {
                                    value: /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g,
                                    message: 'Допустимы только цифры и латинские символы',
                                },
                            })
                        }
                    />
                    {
                        validateErrors.username
                        && <InlineAlert caption={validateErrors.username.message || ''} />
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
