import menu from "../../assets/icons/menu.svg";
import trash from "../../assets/icons/trash.svg";
import arrow_right from "../../assets/icons/arrow_right.svg";
import monitor from "../../assets/img/monitor.webp";

const Main = () => {

    const arr = [0, 0, 0, 0, 0];

    return (
        <section className="p-4 w-100">
            <div className="d-flex align-items-center gap-2 mb-4">
                <button
                    className="fs-4 bg-success text-white rounded-circle border-0 d-flex align-items-center
                justify-content-center"
                    style={{ width: "40px", height: "40px" }}>+</button>
                <h1 className="fs-2 m-0">Orders / 25</h1>
            </div>
            <div className=" d-flex flex-row align-items-start gap-1" style={{ height: "70px" }}>
                <div className=" h-100 w-100 d-flex flex-column gap-2 custom-flex-grow-1">
                    {arr.map(item => (
                        <div
                            className="
                                    d-flex align-items-center 
                                    justify-content-between
                                    w-100
                                    h-100
                                    border
                                    rounded
                                    custom-order-hover  
                                    ">
                            <div className="d-flex align-items-center 
                                    justify-content-between gap-3 p-2">
                                {/* <h2 className="fs-4 m-0 text-decoration-underline"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Not long order name
                                    </h2> */}
                                <span className="d-flex align-items-center gap-2"
                                    style={{ cursor: "pointer" }}>
                                    <img
                                        style={{ width: "40px" }}
                                        className="border rounded-circle p-1" src={menu} alt="Menu icon" />
                                    <span>
                                        <h2 className="m-0 fs-4">23</h2>
                                        <p className="m-0">Products</p>
                                    </span>
                                </span>
                                <span>
                                    <p className="m-0">04/12</p>
                                    <p className="m-0">06/April/2017</p>
                                </span>
                                <span>
                                    <p className="m-0" >2500$</p>
                                    <p className="m-0">250 000.50 UAH</p>
                                </span>
                                {/* <img style={{ cursor: "pointer" }} src={trash} alt="Trash icon" /> */}
                            </div>
                            <span
                                className="h-100 d-flex align-items-center justify-content-center p-3"
                                style={{ backgroundColor: "lightgray" }}>
                                <img src={arrow_right} alt="Arrow right icon" />
                            </span>
                        </div>
                    ))}
                </div>
                <div className="border p-2
                rounded custom-flex-grow-2 p-3">
                    <h2>Long order name...</h2>
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <button
                            style={{ width: "35px", height: "35px" }}
                            className="bg-success border-0 text-white rounded-circle">+</button>
                        <h2 className="fs-4 m-0 text-success ">Add product</h2>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        {
                            arr.map(item => (
                                <div className="d-flex justify-content-between align-items-center border-top p-2">
                                    <div className="d-flex align-items-center gap-4">
                                        <div style={{ width: "15px", height: "15px" }}
                                            className="rounded-circle bg-success"></div>
                                        <img src={monitor} alt="Product photo" style={{ width: "60px" }} />
                                        <div>
                                            <h2 className="m-0 fs-5">Product 1</h2>
                                            <p className="m-0">SN-12.3454783</p>
                                        </div>
                                        <h2 className="m-0 fs-5 text-success">Available</h2>
                                    </div>
                                    <img src={trash} alt="Trash icon" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Main;