import { useNavigate, Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { LoginResponse } from '../../interfaces/auth.interface';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { PREFIX } from '../../helpers/API';
import styles from './Login.module.css';

export type LoginForm = {
	password: {
		value: string;
	};
	email: {
		value: string;
	};
}

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { password, email } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				password,
				email
			});
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}

	};

	return <div className={styles['login']}>
		<Headling>Вход</Headling>
		{error && <div className={styles['error']}>{error}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor="email">Ваш email</label>
				<Input placeholder='Email' name='email' id="email" />
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Ваш пароль</label>
				<Input placeholder='Пароль' name='password' type="password" id="password" />
			</div>
			<Button appearence="big">Вход</Button>
		</form>
		<div className={styles['links']}>
			<div>Нет акканута?</div>
			<Link to="/auth/register">Зарегистрироваться</Link>
		</div>
	</div>;
}