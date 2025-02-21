import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Product, fetchProducts } from "../../redux/slices/productSlice";
import { RootState } from "../../redux/store";
import { formatItemDate, formatItemTime } from "../../utils/dateUtils";


import menu from "../../assets/icons/menu.svg";
import trash from "../../assets/icons/trash.svg";
import arrow_right from "../../assets/icons/arrow_right.svg";
import monitor from "../../assets/img/monitor.webp";
import close from "../../assets/icons/close.svg";
import arrow_dropdown from "../../assets/icons/arrow_drop_down.svg";

const Products = () => {

    const dispatch = useAppDispatch();
    const {list: products, loading: productLoading, error: productError} = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({limit: 5, offset: 0}));
    }, [dispatch])

    const arr = [0, 0, 0, 0, 0];

    if(productLoading) return <h1>Loading...</h1>
    if(productError) return <h1>Error...</h1>

    const renderPrices = (product: Product) => {
        return product.prices.map(price => (
            <p className="m-0" style={{ color: `${price.isDefault ? null : "grey"}` }}>{price.value} {price.symbol}</p>
        ))
    }

    return (
        <section className="p-4 w-100 overflow-auto">
            <div className="d-flex align-items-center gap-3 mb-4">
                <button
                    className="fs-4 bg-success text-white rounded-circle border-0 d-flex align-items-center
                justify-content-center"
                    style={{ width: "40px", height: "40px" }}>+</button>
                <h1 className="fs-2 m-0">Products / {products.length}</h1>
                <div className="d-flex align-items-center gap-1 ">
                    <label htmlFor="specification">Type</label>
                    <div className="dropdown">
                        <button className="
                        bg-white text-black
                        btn btn-secondary 
                        dropdown-toggle"
                            style={{ maxWidth: "400px" }}
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Type
                        </button>
                        <ul className="dropdown-menu">
                            {
                                arr.map(item => (
                                    <li className="dropdown-item">Type 1</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <label htmlFor="specification">Specification</label>
                    <div className="position-relative d-flex align-items-center">
                        <div className="dropdown">
                            <button className="
                            bg-white text-black 
                            btn btn-secondary 
                            dropdown-toggle"
                                style={{ maxWidth: "400px" }}
                                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Specification
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    arr.map(item => (
                                        <li className="dropdown-item">Specification 1</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row align-items-start gap-1 " style={{ height: "70px" }}>
                <div className=" d-flex flex-column gap-2 custom-flex-grow-1 ">
                    {products.map(product => (
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
                                        <span style={{ color: "grey" }}>from</span> {product.guarantees[0].startDate}
                                    </p>
                                    <p className="m-0 d-flex align-items-center justify-content-between gap-2">
                                        <span style={{ color: "grey" }}>to</span> {product.guarantees[0].endDate}
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
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products