import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { userActions } from '../../store/user.slice';
import Button from '../../components/Button/Button';
import { AppDispath } from '../../store/store';
import styles from './Layout.module.css';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} alt="Аватар пользователя" src="/avatar.png" />
				<div className={styles['name']}>Антон Ларичев</div>
				<div className={styles['email']}>alari@ya.ru</div>
			</div>
			<div className={styles['menu']}>
				<NavLink className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})} to='/'>
					<img src="/menu-icon.svg" alt="Иконка меню" />
					Меню</NavLink>
				<NavLink className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})} to='/cart'>
					<img src="/cart-icon.svg" alt="Иконка корзины" />Корзина</NavLink>
			</div>
			<Button className={styles['exit']} onClick={logout}>
				<img src="/exit-icon.svg" alt="Иконка выхода" />
				Выход
			</Button>
		</div>
		<div className={styles['content']}>
			<Outlet />
		</div>
	</div>;
}