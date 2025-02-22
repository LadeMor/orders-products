import React from "react";
import { formatItemDate, formatItemTime } from "../../../utils/dateUtils";
import { Order } from "../../../redux/slices/orderSlice";

import arrow_right from "../../../assets/icons/arrow_right.svg";
import menu from "../../../assets/icons/menu.svg";
import trash from "../../../assets/icons/trash.svg";

interface OrderProps {
    order: Order,
    index: number,
    onOrderClick: (orderId: number) => void,
    onDeleteClick: (order: Order) => void,
    displayProductData: boolean,
    selectedOrderId: number | null
}

const OrderItem: React.FC<OrderProps> = ({
    order,
    index,
    onOrderClick,
    displayProductData,
    selectedOrderId, 
    onDeleteClick }) => {
    return (
        <>
            <div
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
                     onClick={() => onOrderClick(order.id)}
                        style={{ cursor: "pointer" }}>
                        <img
                            style={{ width: "40px" }}
                            className="border rounded-circle p-1" src={menu} alt="Menu icon" />
                        <span>
                            <h2 className="m-0 fs-4">{Number(order.product_count) === 0 ? 0 : order.product_count - 1}</h2>
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
                        !displayProductData ? <img onClick={() => onDeleteClick(order)} style={{ cursor: "pointer" }} src={trash} alt="Trash icon" /> : null
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

        </>
    );
}

export default OrderItem;