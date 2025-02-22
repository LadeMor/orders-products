import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/slices/productSlice";
import { RootState } from "../../redux/store";

import reset from "../../assets/icons/reset.svg";
import ProductList from "../../components/product/product-list/ProductList";
import ProductDropDown from "../../components/product/product-drop-down/ProductDropDown";

export interface Filters {
    product_types: string[],
    specifications: string[]
}

const Products = () => {

    const [filterList, setFilterList] = useState<Filters | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedSpecification, setSelectedSpecification] = useState<string | null>(null);
    const [totalProducts, setTotalProducts] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const { list: products, loading: productLoading, error: productError } = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ productType: selectedType, specification: selectedSpecification, limit: 5, offset: 0 }));
    }, [dispatch, selectedType, selectedSpecification])

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/products/filters`);

                if (response.ok) {
                    const data = await response.json();
                    setFilterList(data[0]);
                } else {
                    throw Error("Failed to fetch filters");
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchFilters();
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            setTotalProducts(products[0].total_products);
        }
    }, [dispatch, products])

    if (productLoading) return <h1>Loading...</h1>
    if (productError) return <h1>Error...</h1>

    return (
        <section className="p-4 w-100 overflow-auto">
            <div className="d-flex align-items-center gap-3 mb-4">
                <button
                    className="fs-4 bg-success text-white rounded-circle border-0 d-flex align-items-center
                justify-content-center"
                    style={{ width: "40px", height: "40px" }}>+</button>
                <h1 className="fs-2 m-0">Products / {totalProducts ? totalProducts : "Loading..."}</h1>
                <div className="d-flex align-items-center gap-1 ">
                    <label htmlFor="specification">Type</label>
                    <ProductDropDown
                        defaultPlaceholder={"Type"}
                        filterList={filterList}
                        selectedDropDownItem={selectedType}
                        setStateValue={setSelectedType}
                        filterKey="product_types"
                    />
                    <button
                        onClick={() => setSelectedType(null)}
                        className="border-1 bg-light rounded">
                        <img src={reset} alt="Reset settings" />
                    </button>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <label htmlFor="specification">Specification</label>
                    <div className="position-relative d-flex align-items-center gap-1">
                        <ProductDropDown
                            defaultPlaceholder={"Specification"}
                            filterList={filterList}
                            selectedDropDownItem={selectedSpecification}
                            setStateValue={setSelectedSpecification}
                            filterKey="specifications"
                        />
                        <button
                            onClick={() => setSelectedSpecification(null)}
                            className="border-1 bg-light rounded">
                            <img src={reset} alt="Reset settings" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row align-items-start gap-1 " style={{ height: "70px" }}>
                <div className=" d-flex flex-column gap-2 custom-flex-grow-1 ">
                    <ProductList
                        isFull={true}
                        products={products}
                        productsError={productError}
                        productsLoading={productLoading}
                    />
                </div>
            </div>
        </section>
    );
}

export default Products