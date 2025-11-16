export interface IApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
  pagination?: IPagination;
}

export interface IPagination {
  total?: number;
  currentPage?: number;
  perPage?: number;
  totalPages?: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ICategory {
  id?: number;
  name?: string;
  isActive?: boolean;
  
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ICustomer {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  isActive?: boolean;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IColor {
  id?: number;
  hexCode?: string;
  productId?: number;
}

export interface IIMage {
  id?: number;
  productId?: number;
  url?: string;
  sortOrder?: number;
}

export interface IProduct {
  id?: number;
  name?: string;
  categoryId?: number;
  category?: ICategory;
  description?: string;
  price?: number;
  quantity?: number;
  discountPercent?: string;
  isActive?: boolean;
  colors?: IColor[];
  images?: IIMage[];

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ICategoryOption {
  label?: string;
  value?: string;
}

export interface IDevice {
  id?: number;
  factoryId?: number;
  model?: string;
  location?: string;
  ipAddress?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IHoliday {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  type?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IContractType {
  id?: number;
  name?: string;
  code?: string;

  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}