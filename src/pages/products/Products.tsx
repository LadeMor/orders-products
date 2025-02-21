import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Product, fetchProducts } from "../../redux/slices/productSlice";
import { RootState } from "../../redux/store";
import { addZero, formatItemDate, formatItemTime } from "../../utils/dateUtils";

import menu from "../../assets/icons/menu.svg";
import trash from "../../assets/icons/trash.svg";
import arrow_right from "../../assets/icons/arrow_right.svg";
import monitor from "../../assets/img/monitor.webp";
import close from "../../assets/icons/close.svg";
import arrow_dropdown from "../../assets/icons/arrow_drop_down.svg";
import reset from "../../assets/icons/reset.svg";

interface Filters{
    product_types: string[],
    specifications: string[]
}

const Products = () => {

    const [filterList, setFilterList] = useState<Filters | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedSpecification, setSelectedSpecification] = useState<string | null>(null);
    const [totalProducts, setTotalProducts] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const {list: products, loading: productLoading, error: productError} = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({productType: selectedType, specification: selectedSpecification, limit: 5, offset: 0}));
    }, [dispatch, selectedType, selectedSpecification])
    
    useEffect(() => {
        const fetchFilters = async () => {
           try{
            const response = await fetch(`http://localhost:3002/api/products/filters`);

            if(response.ok){
                const data = await response.json();
                setFilterList(data[0]);
            }else{
                throw Error("Failed to fetch filters");
            }

           }catch(err){
            console.log(err);
           }
        }
        fetchFilters();
    }, [])

    useEffect(() => {
        if(products.length > 0){
            setTotalProducts(products[0].total_products);
        }
    }, [dispatch, products])

    if(productLoading) return <h1>Loading...</h1>
    if(productError) return <h1>Error...</h1>

    const renderPrices = (product: Product) => {
        return product.prices.map(price => (
            <p className="m-0" style={{ color: `${price.isDefault ? null : "grey"}` }}>{price.value} {price.symbol}</p>
        ))
    }

    const formatProductDate = (date: string):string => {
        const selectedProductDate = new Date(date);
        return `${addZero(selectedProductDate.getDate())}/
        ${addZero(selectedProductDate.getMonth() + 1)}/
        ${selectedProductDate.getFullYear()}`
    }

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
                    <div className="dropdown">
                        <button className="
                        bg-white text-black
                        btn btn-secondary 
                        dropdown-toggle"
                            style={{ maxWidth: "400px" }}
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedType ? selectedType : "Type"}
                        </button>
                        <ul className="dropdown-menu">
                            {
                                filterList !== null ? filterList.product_types.map((type, index) => (
                                    <li 
                                    key={index} 
                                    className="dropdown-item"
                                    onClick={() => setSelectedType(type)}
                                    >{type}</li>
                                ))
                                :
                                <h2>Loading...</h2>
                            }
                        </ul>
                    </div>
                    <button 
                    onClick={() => setSelectedType(null)}
                    className="border-1 bg-light rounded">
                        <img src={reset} alt="Reset settings" />
                    </button>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <label htmlFor="specification">Specification</label>
                    <div className="position-relative d-flex align-items-center gap-1">
                        <div className="dropdown">
                            <button className="
                            bg-white text-black 
                            btn btn-secondary 
                            dropdown-toggle"
                                style={{ maxWidth: "400px" }}
                                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectedSpecification ? selectedSpecification : "Specification"}
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    filterList ? filterList.specifications.map((specification, index) => (
                                        <li 
                                        className="dropdown-item"
                                        key={index}
                                        onClick={() => setSelectedSpecification(specification)}
                                        >{specification}</li>
                                    ))
                                    :
                                    <h2>Loading...</h2>
                                }
                            </ul>
                        </div>
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
                    {products.length > 0 ? products.map(product => (
                        <div 
                        style={{minWidth:"200px", whiteSpace: "nowrap"}}
                        className="d-flex justify-content-between gap-2 align-items-center border-top p-2">
                            <div className="d-flex align-items-center gap-4">
                                <div style={{ width: "15px", height: "15px" }}
                                    className="rounded-circle bg-success"></div>
                                <img src={monitor} alt="Product photo" style={{ width: "60px" }} />
                                <div>
                                    <h2 className="m-0 fs-5">{product.title}</h2>
                                    <p className="m-0">{product.specification}</p>
                                </div>
                                <h2 className="m-0 fs-5 text-success">Available</h2>
                                <div>
                                    <p className="m-0 d-flex align-items-center justify-content-between gap-2">
                                        <span style={{ color: "grey" }}>from {formatProductDate(product.guarantees[0].start_date)}</span> 
                                    </p>
                                    <p className="m-0 d-flex align-items-center justify-content-between gap-2">
                                        <span style={{ color: "grey" }}>to {formatProductDate(product.guarantees[0].end_date)}</span> 
                                    </p>
                                </div>
                                <p style={{ color: "grey" }} className="m-0">{product.is_new ? "New" : "Used"}</p>
                                <div className="d-flex flex-column ">
                                    {
                                        renderPrices(product)
                                    }
                                </div>
                                <p className="fs-5 m-0 text-decoration-underline" style={{ color: "grey" }}>{product.order_name}</p>
                                <p className="fs-5 m-0 text-decoration-underline" style={{ color: "grey" }}>Alex Super</p>
                                <div className="d-flex flex-column align-items-center">
                                    <p className="m-0" style={{ fontSize: "14px", color: "grey" }}>{formatItemTime(product.date)}</p>
                                    <p className="m-0">{formatItemDate(product.date)}</p>
                                </div>
                            </div>
                            <img src={trash} alt="Trash icon" />
                        </div>
                    ))
                :
                <h1>No results</h1>
                }
                </div>
            </div>
        </section>
    );
}

export default Products