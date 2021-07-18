declare interface Category {
  _id: string;
  name: string;
  type: number;
  category_2: Category_2[]
}

declare interface Category_2 {
  name: string;
  _id: string;
}
