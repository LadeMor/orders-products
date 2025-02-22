import { Product } from "../../../redux/slices/productSlice";
import ProductItem from "../product-item/ProductItem";

interface ProductListProps {
    productsLoading: boolean,
    productsError: string | null,
    products: Product[],
    isFull: boolean
}

const ProductList: React.FC<ProductListProps> = ({ productsLoading, productsError, products, isFull }) => {

    if (productsLoading) {
        return <h1 className="fs-3">Loading products</h1>
    }

    if (productsError) {
        return <h1 className="fs-3">Error</h1>
    }

    if (products.length <= 0) {
        return <h1 className="fs-3">There are no products in this order</h1>
    }

    return (
        <>
            {!productsLoading && !productsError ?
                products.map(item => (
                    <ProductItem product={item} isFull={isFull} />
                ))
                :
                <h1>Error</h1>
            }
        </>
    );
}

export default ProductList;