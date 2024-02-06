import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

function MenuList({products}: MenuListProps) {
	return products.map(p => (
		<ProductCard
			description={p.ingredients.join(', ')}
			id={p.id}
			image={p.image}
			key={p.id}
			name={p.name}
			price={p.price}
			rating={p.rating}
		/>
	));
}

export default MenuList;