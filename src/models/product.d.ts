type TReview = {
  rating: number;
  comment: string;
  date: string; // ISO 8601 date string
  reviewerName: string;
  reviewerEmail: string;
};

type TDimensions = {
  width: number;
  height: number;
  depth: number;
};

type TMeta = {
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  barcode: string;
  qrCode: string;
};

type TProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: TDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: TReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: TMeta;
  images: string[];
  thumbnail: string;
};

export type { TProductType };
