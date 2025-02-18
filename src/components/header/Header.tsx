import main_logo from "../../assets/icons/main-logo.svg";
import TopMenu from "../top-menu/TopMenu";

const Header = () => {
    return(
        <header className="d-flex shadow p-3 align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-5">
                <div className="d-flex align-items-center gap-3">
                    <img style={{width:"40px"}} src={main_logo} alt="Star icon" />
                    <h3 className="m-0">Inventory</h3>
                </div>
                <input placeholder="Search"
                    type="text" 
                    style={{maxWidth: "300px", backgroundColor:"lightgray"}}
                    className="mw-100 border-0 px-2 py-1"/>
            </div>
            <TopMenu/>
        </header>
    );
}

export default Header;