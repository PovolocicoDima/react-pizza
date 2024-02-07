import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearence?: 'small' | 'big';
	children: ReactNode;
}