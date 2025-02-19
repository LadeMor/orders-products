import person from "../../assets/img/person.png";
import gear from "../../assets/icons/gear.svg";

import { Link, NavLink } from "react-router-dom";

const NavigationMenu = () => {
    return (
        <div className="shadow min-vh-100 d-flex flex-column align-items-center px-5 py-5 gap-4">
            <div className="position-relative"
            >
                <img style={{ width: "150px" }} src={person} alt="Person profile picture" />
                <button className="
                bg-light 
                rounded-circle 
                p-3 position-absolute border-0
                shadow"
                    style={{ bottom: "0px", right: "0px", width: "60px", height: "60px" }}>
                    <img src={gear} alt="Settings" />
                </button>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
                <div className="d-flex flex-column align-items-center">
                    <NavLink to="/"
                        className={({ isActive }) => isActive ? `border-bottom 
                        border-success border-4 
                        text-decoration-none text-reset fs-4 fw-bold`
                            : `text-decoration-none text-reset fs-4 fw-bold`}>
                        Orders
                    </NavLink>
                    {/* <div className="bg-success"
                            style={{ height: "4px", width: "120%" }}></div> */}
                </div>
                <div className="d-flex flex-column  align-items-center">
                    <NavLink to="/"
                        className="text-decoration-none text-reset fs-4 fw-bold">Groups</NavLink>
                </div>
                <div className="d-flex flex-column  align-items-center">
                    <NavLink to="/products"
                        className={({ isActive }) => isActive ? `border-bottom 
                        border-success border-4 
                        text-decoration-none text-reset fs-4 fw-bold`
                            : `text-decoration-none text-reset fs-4 fw-bold`}>
                        Products
                    </NavLink>
                </div>
                <div className="d-flex flex-column  align-items-center">
                    <NavLink to="/"
                        className="text-decoration-none text-reset fs-4 fw-bold">Users</NavLink>
                </div>
                <div className="d-flex flex-column  align-items-center">
                    <NavLink to="/"
                        className="text-decoration-none text-reset fs-4 fw-bold">Settings</NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavigationMenu;