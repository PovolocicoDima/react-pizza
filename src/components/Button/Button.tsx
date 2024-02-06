import cn from 'classnames';

import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

function Button({ appearence = 'small', children, className, ...props }: ButtonProps) {
	return (
		<button className={cn(styles['button'], styles['accent'], className, {
			[styles['big']]: appearence === 'big',
			[styles['small']]: appearence === 'small'
		})} {...props}>{children}</button>
	);
}

export default Button;