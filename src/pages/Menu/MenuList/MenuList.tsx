import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

function MenuList({products}: MenuListProps) {
	return products.map(p => (
		<ProductCard
			description={p.ingredients.join(', ')}
			rating={p.rating}
			image={p.image}
			price={p.price}
			name={p.name}
			key={p.id}
			id={p.id}
		/>
	));
}

export default MenuList;