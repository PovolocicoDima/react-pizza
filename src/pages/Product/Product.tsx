import { useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';

import { Product } from '../../interfaces/product.interface';

export function Product() {
	const data = useLoaderData() as { data: Product };

	return <>
		<Suspense fallback={'Загружаю...'}>
			<Await
				resolve={data.data}
			>
				{({ data }: { data: Product }) => (
					<>Product - {data.name}</>
				)}
			</Await>
		</Suspense>
	</>;
}