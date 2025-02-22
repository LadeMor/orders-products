import React from "react";
import trash from "../../../assets/icons/trash.svg";
import monitor from "../../../assets/img/monitor.webp";
import { Product } from "../../../redux/slices/productSlice";
import { addZero, formatItemDate, formatItemTime } from "../../../utils/dateUtils";

interface ProductItemProps {
    product: Product,
    isFull: boolean
}

const ProductItem: React.FC<ProductItemProps> = ({ product, isFull }) => {

    const renderPrices = (product: Product) => {
        return product.prices.map(price => (
            <p className="m-0" style={{ color: `${price.isDefault ? null : "grey"}` }}>{price.value} {price.symbol}</p>
        ))
    }

    const formatProductDate = (date: string): string => {
        const selectedProductDate = new Date(date);
        return `${addZero(selectedProductDate.getDate())}/
        ${addZero(selectedProductDate.getMonth() + 1)}/
        ${selectedProductDate.getFullYear()}`
    }

    return (
        <div
            style={{ minWidth: "200px", whiteSpace: "nowrap" }}
            className="d-flex justify-content-between gap-2 align-items-center border-top p-2">
            <div className="d-flex align-items-center gap-4">
                <div style={{ width: "15px", height: "15px" }}
                    className="rounded-circle bg-success"></div>
                <img src={monitor} alt="Product" style={{ width: "60px" }} />
                <div>
                    <h2 className="m-0 fs-5">{product.title}</h2>
                    <p className="m-0">{product.specification}</p>
                </div>
                <h2 className="m-0 fs-5 text-success">Available</h2>
                {
                    isFull ?
                        <>
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
                        </>
                        :
                        null
                }
            </div>
            <img src={trash} alt="Trash icon" />
        </div>
    );
}

export default ProductItem;