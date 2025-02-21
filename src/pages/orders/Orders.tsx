import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOrders, selectOrder } from "../../redux/slices/orderSlice";
import { fetchProducts, fetchProductByOrderID } from "../../redux/slices/productSlice";
import { RootState } from "../../redux/store";
import { selectCurrentMonthName, addZero, formatItemDate, formatItemTime } from "../../utils/dateUtils";
import { Product } from "../../redux/slices/productSlice";

import menu from "../../assets/icons/menu.svg";
import trash from "../../assets/icons/trash.svg";
import arrow_right from "../../assets/icons/arrow_right.svg";
import monitor from "../../assets/img/monitor.webp";
import close from "../../assets/icons/close.svg";

const Orders = () => {

    const [displayProductData, setDisplayProductData] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [totalOrders, setTotalOrders] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const { list: orders, loading: ordersLoading, error: ordersError } = useAppSelector((state: RootState) => state.orders);
    const { list: products, loading: productsLoading, error: productsError } = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchOrders({ limit: 5, offset: 0 }));
    }, [dispatch])

    useEffect(() => {
        if (selectedOrderId) {
            dispatch(fetchProductByOrderID({ orderId: selectedOrderId, limit: 5, offset: 0 }))
        }
    }, [selectedOrderId, dispatch])

    useEffect(() => {
        if (orders.length > 0) {
            setTotalOrders(orders[0].total_orders);
        }
    }, [orders])

    const onOrderClick = (orderId: number): void => {
        setSelectedOrderId(orderId);
        setDisplayProductData(true);
    }

    const onCloseClick = () => {
        setSelectedOrderId(null);
        setDisplayProductData(false);
    }

    if (ordersLoading) return <h1>Loading...</h1>
    if (ordersError) return <h1>Error</h1>

    const renderProductListByOrder = () => {
        if (productsLoading) {
            return <h1 className="fs-3">Loading products</h1>
        } else if (productsError) {
            return <h1 className="fs-3">Error</h1>
        }
        else if (products.length <= 0) {
            return <h1 className="fs-3">There are no products in this order</h1>
        }
        else if (!productsLoading && !productsError) {
            return products.map(item => (
                <div className="d-flex justify-content-between align-items-center border-top p-2">
                    <div className="d-flex align-items-center gap-4">
                        <div style={{ width: "15px", height: "15px" }}
                            className="rounded-circle bg-success"></div>
                        <img src={monitor} alt="Product photo" style={{ width: "60px" }} />
                        <div>
                            <h2 className="m-0 fs-5">{item.title}</h2>
                            <p className="m-0">{item.product_type}</p>
                        </div>
                        <h2 className="m-0 fs-5 text-success">Available</h2>
                    </div>
                    <img src={trash} alt="Trash icon" />
                </div>
            ))
        }
    }

    return (
        <section className="p-4 w-100 overflow-auto">
            <div className="d-flex align-items-center gap-2 mb-4">
                <button
                    className="fs-4 bg-success text-white rounded-circle border-0 d-flex align-items-center
                justify-content-center"
                    style={{ width: "40px", height: "40px" }}>+</button>
                <h1 className="fs-2 m-0">Orders / {totalOrders ? totalOrders : "Loading..."}</h1>
            </div>
            <div className=" d-flex flex-row align-items-start gap-1 " style={{ height: "70px" }}>
                <div className="h-100 d-flex flex-column gap-2 custom-flex-grow-1">
                    {orders.map((order, index) => (
                        <div
                            onClick={() => onOrderClick(order.id)}
                            key={index}
                            style={{ whiteSpace: "nowrap", minWidth: "100px" }}
                            className="
                                
                                    d-flex align-items-center 
                                    justify-content-between
                                    border
                                    rounded
                                    custom-order-hover 
                                    cursor-pointer 
                                    
                                    ">
                            <div className="
                            d-flex 
                            align-items-center 
                            justify-content-between           
                            gap-3 
                            p-2
                            w-100">
                                {
                                    !displayProductData ?
                                        <h2 className="fs-4 m-0 text-decoration-underline"
                                            style={{ cursor: "pointer" }}
                                        >
                                            {order.title}
                                        </h2>
                                        :
                                        null
                                }
                                <span className="d-flex align-items-center gap-2"
                                    style={{ cursor: "pointer" }}>
                                    <img
                                        style={{ width: "40px" }}
                                        className="border rounded-circle p-1" src={menu} alt="Menu icon" />
                                    <span>
                                        <h2 className="m-0 fs-4">{order.product_count}</h2>
                                        <p className="m-0">Products</p>
                                    </span>
                                </span>
                                <span>
                                    <p className="m-0">{formatItemTime(order.date)}</p>
                                    <p className="m-0">{formatItemDate(order.date)}</p>
                                </span>
                                {
                                    !displayProductData ?
                                        <span>
                                            <p className="m-0" >{order.total_price_usd}$</p>
                                            <p className="m-0">{order.total_price_uah} UAH</p>
                                        </span>
                                        :
                                        null
                                }
                                {
                                    !displayProductData ? <img style={{ cursor: "pointer" }} src={trash} alt="Trash icon" /> : null
                                }
                            </div>
                            {
                                displayProductData ?
                                    order.id === selectedOrderId ?
                                        <span
                                            className="h-100 d-flex align-items-center justify-content-center p-3"
                                            style={{ backgroundColor: "lightgray" }}>
                                            <img src={arrow_right} alt="Arrow right icon" />
                                        </span>
                                        :
                                        null
                                    :
                                    null
                            }
                        </div>
                    ))}
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <button>Previous</button>
                        <p className="m-0">1</p>
                        <button>Next</button>
                    </div>
                </div>
                {
                    displayProductData
                        ?
                        <div className="border p-2
                rounded custom-flex-grow-2 p-3
                position-relative">
                            <h2>Long order name...</h2>
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <button
                                    style={{ width: "35px", height: "35px" }}
                                    className="bg-success border-0 text-white rounded-circle">+</button>
                                <h2 className="fs-4 m-0 text-success ">Add product</h2>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                {renderProductListByOrder()}
                            </div>
                            <button
                                onClick={onCloseClick}
                                className="
                                    position-absolute 
                                    
                                    rounded-circle 
                                    bg-white 
                                    border-0 
                                    translate-middle 
                                    shadow"
                                style={{ width: "50px", height: "50px", top: "0px", right: "-50px" }}>
                                <img src={close} alt="Close icon" />
                            </button>
                        </div>
                        :
                        null
                }
            </div>
        </section>
    );
}

export default Orders;