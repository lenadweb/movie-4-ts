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
    onSubmit: (username: string, email: string, password: string) => void;
    error: any;
}

const RegistrationForm: FC<ILoginForm> = ({ onSubmit, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors: validateErrors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    });

    const onSubmitHandler = ({ email, password, username }: any): void => {
        onSubmit(username, email, password);
    };

    return (
        <div className={cn(styles.wrapper)}>
            <form className={styles.container}>
                <Block className={styles.title}>
                    <Image src={cloud} width="100px" />
                    <H size="xl">
                        Регистрация
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
                    <div className={styles.textAlignCenter}>
                        {
                            error
                            && <InlineAlert caption="Ошибка регистрации" />
                        }
                    </div>
                    <BasicButton caption="Регистрация" onClick={handleSubmit(onSubmitHandler)} />
                </Block>
                <Block className={styles.textAlignCenter}>
                    <span>Есть аккаунт? </span>
                    <Link to="/login">
                        <TextButton className={styles.pink} caption="Авторизация" />
                    </Link>
                </Block>
            </form>
        </div>
    );
};

export default RegistrationForm;
