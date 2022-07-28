import React from "react";
import { DropdownProps } from "../types/Components";

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
    return (
        <label>
            {label}:
            <select className="ml-3" value={value} onChange={onChange}>
                {options.map(option =>
                    <option value={option.value}>{option.label}</option>
                )}
            </select>
        </label>
    );
}

export default Dropdown;