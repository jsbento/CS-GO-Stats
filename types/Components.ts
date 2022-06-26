export interface ButtonBarProps {
    page: number;
    pages: number;
    onPageChange: (dir: string) => void;
}