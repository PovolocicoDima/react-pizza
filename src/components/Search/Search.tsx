import { forwardRef } from 'react';
import cn from 'classnames';

import { SearchProps } from './Search.props';
import styles from './Search.module.css';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ isValid = true, className, ...props }, ref) {
	return (
		<div className={styles['input-wrapper']}>
			<input className={cn(styles['input'], className, {
				[styles['invalid']]: isValid
			})} ref={ref} {...props} />
			<img className={styles['icon']} src='/search-icon.svg' alt='Иконка лупы' />
		</div>
	);
});

export default Search;