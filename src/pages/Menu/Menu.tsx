import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { Product } from '../../interfaces/product.interface';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { MenuList } from './MenuList/MenuList';
import { PREFIX } from '../../helpers/API';
import styles from './Menu.module.css';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<undefined | string>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' />
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && <MenuList products={products} />}
			{isLoading && <>Загружаем продукты...</>}
		</div>
	</>;
}

export default Menu;