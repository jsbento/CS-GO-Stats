import React from "react";
import { DropdownProps } from "../types/Components";

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
    return (
        <label className="font-semibold mx-2">
            {label}:
            <select className="ml-3" value={value} onChange={onChange}>
                {options.map(option =>
                    <option key={option.value} value={option.value}>{option.label}</option>
                )}
            </select>
        </label>
    );
}

export default Dropdown;