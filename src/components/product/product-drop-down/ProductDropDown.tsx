import React from "react";
import { Filters } from "../../../pages/products/Products";

interface ProductDropDownProps {
    defaultPlaceholder: string,
    filterList: Filters | null,
    selectedDropDownItem: string | null,
    setStateValue:React.Dispatch<React.SetStateAction<string | null>>,
    filterKey: keyof Filters

}

const ProductDropDown: React.FC<ProductDropDownProps> = ({defaultPlaceholder, filterList, selectedDropDownItem, setStateValue, filterKey}) => {
    return (
        <div className="dropdown">
            <button className="
                            bg-white text-black 
                            btn btn-secondary 
                            dropdown-toggle"
                style={{ maxWidth: "400px" }}
                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedDropDownItem ? selectedDropDownItem : defaultPlaceholder}
            </button>
            <ul className="dropdown-menu">
                {
                    filterList ? filterList[filterKey].map((specification, index) => (
                        <li
                            className="dropdown-item"
                            key={index}
                            onClick={() => setStateValue(specification)}
                        >{specification}</li>
                    ))
                        :
                        <h2>Loading...</h2>
                }
            </ul>
        </div>
    );
}

export default ProductDropDown