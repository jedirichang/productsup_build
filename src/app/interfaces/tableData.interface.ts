export interface TableData {
    id: number;
    gtin: number;
    product_name: string;
    product_desc: string;
    price: number;
    currency: string;
    category: string;
    gender: string;
    quantity: number;
    size: string;
    style: string;
    color: string;
    url: string;
    image: string;
    image_additional: string;
    additional: string;
    source_video: string;
}

export interface ColumnDef {
    columnDef: string;
    header: string;
    cell: Function
}