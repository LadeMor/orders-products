import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchOrders } from "../../../redux/slices/orderSlice";
import { fetchProductByOrderID } from "../../../redux/slices/productSlice";
import { RootState } from "../../../redux/store";

import close from "../../../assets/icons/close.svg";
import OrderItem from "../order-item/OrderItem";
import ProductList from "../../product/product-list/ProductList";

const OrderList = () => {

    const dispatch = useAppDispatch();
    const { list: orders, loading: ordersLoading, error: ordersError } = useAppSelector((state: RootState) => state.orders);
    const { list: products, loading: productsLoading, error: productsError } = useAppSelector((state: RootState) => state.products);

    const [totalOrders, setTotalOrders] = useState<number | null>(null);
    const [displayProductData, setDisplayProductData] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

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

    if (ordersLoading) return <h1>Loading...</h1>
    if (ordersError) return <h1>Error</h1>

    const onOrderClick = (orderId: number): void => {
        setSelectedOrderId(orderId);
        setDisplayProductData(true);
    }

    const onCloseClick = () => {
        setSelectedOrderId(null);
        setDisplayProductData(false);
    }


    return (
        <>
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
                        <OrderItem
                            order={order}
                            index={index}
                            onOrderClick={onOrderClick}
                            displayProductData={displayProductData}
                            selectedOrderId={selectedOrderId}
                        />
                    ))}
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
                                <ProductList
                                    isFull={false}
                                    products={products}
                                    productsError={productsError}
                                    productsLoading={productsLoading}
                                />
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
        </>
    );
}

export default OrderList;