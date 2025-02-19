import menu from "../../assets/icons/menu.svg";
import trash from "../../assets/icons/trash.svg";
import arrow_right from "../../assets/icons/arrow_right.svg";
import monitor from "../../assets/img/monitor.webp";
import close from "../../assets/icons/close.svg";
import arrow_dropdown from "../../assets/icons/arrow_drop_down.svg";
import { useState } from "react";

const Products = () => {

    const [showTypeDropdown, setShowTypeDropDown] = useState<boolean>(false);



    const arr = [0, 0, 0, 0, 0];

    return (
        <section className="p-4 w-100">
            <div className="d-flex align-items-center gap-3 mb-4">
                <button
                    className="fs-4 bg-success text-white rounded-circle border-0 d-flex align-items-center
                justify-content-center"
                    style={{ width: "40px", height: "40px" }}>+</button>
                <h1 className="fs-2 m-0">Products / 25</h1>
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
            <div className="h-100 d-flex flex-row align-items-start gap-1" style={{ height: "70px" }}>
                <div className=" h-100 w-100 d-flex flex-column gap-2 custom-flex-grow-1 overflow-auto">
                    {arr.map(item => (
                        <div 
                        style={{minWidth:"200px", whiteSpace: "nowrap"}}
                        className="d-flex justify-content-between gap-2 align-items-center border-top p-2">
                            <div className="d-flex align-items-center gap-4">
                                <div style={{ width: "15px", height: "15px" }}
                                    className="rounded-circle bg-success"></div>
                                <img src={monitor} alt="Product photo" style={{ width: "60px" }} />
                                <div>
                                    <h2 className="m-0 fs-5">Product 1</h2>
                                    <p className="m-0">SN-12.3454783</p>
                                </div>
                                <h2 className="m-0 fs-5 text-success">Available</h2>
                                <div>
                                    <p className="m-0 d-flex align-items-center justify-content-between gap-2">
                                        <span style={{ color: "grey" }}>from</span> 06/04/2017
                                    </p>
                                    <p className="m-0 d-flex align-items-center justify-content-between gap-2">
                                        <span style={{ color: "grey" }}>to</span> 06/08/2025
                                    </p>
                                </div>
                                <p style={{ color: "grey" }} className="m-0">New</p>
                                <div className="d-flex flex-column ">
                                    <p className="m-0" style={{ color: "grey" }}>2500$</p>
                                    <p className="m-0">250000.50 UAH</p>
                                </div>
                                <p className="fs-5 m-0 text-decoration-underline" style={{ color: "grey" }}>Order name</p>
                                <p className="fs-5 m-0 text-decoration-underline" style={{ color: "grey" }}>Alex Super</p>
                                <div className="d-flex flex-column align-items-center">
                                    <p className="m-0" style={{ fontSize: "14px", color: "grey" }}>06 / 12</p>
                                    <p className="m-0">06 / Sep / 2017</p>
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