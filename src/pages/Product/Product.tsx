import { useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';

import { IProduct } from '../../interfaces/product.interface';

export function Product() {
	const data = useLoaderData() as { data: IProduct };

	return <>
		<Suspense fallback={'Загружаю...'}>
			<Await
				resolve={data.data}
			>
				{({ data }: { data: IProduct }) => (
					<>Product - {data.name}</>
				)}
			</Await>
		</Suspense>
	</>;
}

export default Product;