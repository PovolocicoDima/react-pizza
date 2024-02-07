/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import AuthLayout from './layout/Auth/AuthLayout.tsx';
import Register from './pages/Register/Register.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Error } from './pages/Error/Error.tsx';
import Login from './pages/Login/Login.tsx';
import { PREFIX } from './helpers/API.ts';
import './index.css';

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
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
							}, 1500);
						})
					});
					// return defer({
					// 	data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
					// });
					// const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					// return data;
				},
				element: <Suspense fallback="Loading"><Product /></Suspense>,
				errorElement: <>Error</>,
				path: '/product/:id'
			}
		],
		element: <Layout />,
		path: '/'
	},
	{
		children: [
			{
				element: <Login />,
				path: 'login'
			},
			{
				element: <Register />,
				path: 'register'
			}
		],
		element: <AuthLayout />,
		path: '/auth'
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
