/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PREFIX } from './helpers/API.ts';
import './index.css';
import { Layout } from './layout/Menu/Layout.tsx';
import { Error } from './pages/Error/Error.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));
const Cart = lazy(() => import('./pages/Cart/Cart.tsx'));
const Product = lazy(() => import('./pages/Product/Product.tsx'));

const router = createBrowserRouter([
	{
		children: [
			{
				element: <Suspense fallback="Loading"><Menu /></Suspense>,
				path: '/'
			},
			{
				element: <Suspense fallback="Loading"><Cart /></Suspense>,
				path: '/cart'
			},
			{
				element: <Suspense fallback="Loading"><Product /></Suspense>,
				errorElement: <>Error</>,
				loader: async ({ params }) => {
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				},
				path: '/product/:id'
			}
		],
		element: <Layout />,
		path: '/'
	},
	{
		element: <Error />,
		path: '*'
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
