import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

export function Layout() {

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img alt="Аватар пользователя" className={styles['avatar']} src="/avatar.png" />
				<div className={styles['name']}>Антон Ларичев</div>
				<div className={styles['email']}>alari@ya.ru</div>
			</div>
			<div className={styles['menu']}>
				<NavLink className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})} to='/'>
					<img alt="Иконка меню" src="/menu-icon.svg" />
					'Меню</NavLink>
				<NavLink className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})} to='/cart'>
					<img alt="Иконка корзины" src="/cart-icon.svg" />Корзина</NavLink>
			</div>
			<Button className={styles['exit']}>
				<img alt="Иконка выхода" src="/exit-icon.svg" />
				Выход
			</Button>
		</div>
		<div className={styles['content']}>
			<Outlet />
		</div>
	</div>;
}