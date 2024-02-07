import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';

import { userActions, register } from '../../store/user.slice';
import Headling from '../../components/Headling/Headling';
import { AppDispath, RootState } from '../../store/store';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';

export type RegisterForm = {
	password: {
		value: string;
	};
	email: {
		value: string;
	};
	name: {
		value: string;
	};
}

export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const { registerErrorMessage, jwt } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { password, email, name } = target;
		dispatch(register({ password: password.value, email: email.value, name: name.value }));
	};

	return <div className={styles['login']}>
		<Headling>Регистрация</Headling>
		{registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor="email">Ваш email</label>
				<Input placeholder='Email' name='email' id="email" />
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Ваш пароль</label>
				<Input placeholder='Пароль' name='password' type="password" id="password" />
			</div>
			<div className={styles['field']}>
				<label htmlFor="name">Ваше имя</label>
				<Input placeholder='Имя' name='name' id="name" />
			</div>
			<Button appearence="big">Зарегистрироваться</Button>
		</form>
		<div className={styles['links']}>
			<div>Есть акканут?</div>
			<Link to="/auth/login">Войти</Link>
		</div>
	</div>;
}