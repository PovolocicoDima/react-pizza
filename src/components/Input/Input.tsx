import { forwardRef } from 'react';
import cn from 'classnames';

import { InputProps } from './Input.props';
import styles from './Input.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props }, ref) {
	return (
		<input className={cn(styles['input'], className, {
			[styles['invalid']]: isValid
		})} ref={ref} {...props} />
	);
});

export default Input;