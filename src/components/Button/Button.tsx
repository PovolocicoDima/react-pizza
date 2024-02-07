import cn from 'classnames';

import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

function Button({ appearence = 'small', className, children, ...props }: ButtonProps) {
	return (
		<button className={cn(styles['button'], styles['accent'], className, {
			[styles['small']]: appearence === 'small',
			[styles['big']]: appearence === 'big'
		})} {...props}>{children}</button>
	);
}

export default Button;