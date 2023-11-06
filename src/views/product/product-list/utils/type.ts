interface ProductItemType {
  id: number;
  admin_id: number;
  admin_name: string;
  category_id: string;
  price_desc: string;
  location: string;
  product_name: string;
  product_model: string;
  product_version: string;
  price: string;
  low_price?: any;
  catalog_price: string;
  line: string;
  morphology: string;
  soft_name: string;
  spec: string;
  download: string;
  annex: string;
  business_secret_model: string;
  bussiness_secret_date: string;
  sales_license_model: string;
  sales_license_date: string;
  software_copyright: string;
  max_concurrency: string;
  network_port_number?: any;
  throughput: string;
  configuration: string;
  parameters: string;
  introduction: string;
  remark: string;
  status: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  category: Category;
}

interface Category {
  id: number;
  pid?: any;
  name: string;
  created_at: string;
  updated_at: string;
}
