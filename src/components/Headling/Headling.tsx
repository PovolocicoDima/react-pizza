import cn from 'classnames';

import { HeadlingProps } from './Headling.props';
import styles from './Headling.module.css';

function Headling({ className, children, ...props }: HeadlingProps) {
	return (
		<h1 className={cn(className, styles['h1'])} {...props}>{children}</h1>
	);
}

export default Headling;