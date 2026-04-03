export interface Product {
  _id: string;
  images: { url: string; publicId: string; _id: string }[];
  title: string;
  type: string;
  description: string;
  fit_cut?: string;
  fabric_material?: string;
  size: string;
  availableQuantity: number;
  price: number;
  role: string | null;
  targetRoles: string[];
  status: "active" | "inactive";
  rigion: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  image: string;
  title: string;
  type: string;
  description: string;
  fit_cut?: string;
  fabric_material?: string;
  size: string;
  availableQuantity: number;
  price: number;
  role?: string | null;
  status?: "active" | "inactive";
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface Role {
  _id: string;
  roleTitle: string;
  images: string;
  createdAt: string;
  updatedAt: string;
}
