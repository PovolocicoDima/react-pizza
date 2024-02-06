import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './Input.module.css';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, isValid = true, ...props }, ref) {
	return (
		<input className={cn(styles['input'], className, {
			[styles['invalid']]: isValid
		})} ref={ref} {...props} />
	);
});

export default Input;