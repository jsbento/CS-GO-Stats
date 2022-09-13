import React from "react";
import { StatOption } from "./Stats";

export interface ButtonBarProps {
    page: number;
    pages: number;
    onPageChange: (dir: string) => void;
}

export interface DropdownProps {
    label: string;
    value: string;
    options: StatOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface StatCardProps {
    stat: string;
}