import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import { Error as ErropPage } from './pages/Error/Error.tsx';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Register } from './pages/Register/Register.tsx';
import { Product } from './pages/Product/Product.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { PREFIX } from './helpers/API.ts';
import './index.css';

// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		children: [
			{
				element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>,
				path: '/'
			},
			{
				element: <Cart />,
				path: '/cart'
			},
			{
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
							}, 2000);
						})
					});
				},
				errorElement: <>Ошибка</>,
				path: '/product/:id',
				element: <Product />
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
			}, {
				element: <Register />,
				path: 'register'
			}
		],
		element: <AuthLayout />,
		path: '/auth'
	},
	{
		element: <ErropPage />,
		path: '*'
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
