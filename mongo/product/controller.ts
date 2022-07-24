import Product, { IProduct } from './model';
import User from '../user/model';
import { IDBUser } from '../user/model';

export const getProducts = async (): Promise<IProduct[]> => {
  return Product.find({});
};

export const createProduct = async (
  userId: string,
  product: Pick<IProduct, 'name' | 'price'>
): Promise<{
  error: boolean;
  statusCode: number;
  message?: string;
  response?: any;
}> => {
  const productOwner: IDBUser | null = await User.findById(userId);

  if (productOwner) {
    const newProduct = new Product({
      ...product,
      userId
    });
    await newProduct.save();

    productOwner.products.push(newProduct);
    await productOwner.save();

    return {
      error: false,
      statusCode: 201,
      response: newProduct
    };
  }

  return {
    error: true,
    statusCode: 404,
    message: 'User not found for current product'
  };
};

export const updateProduct = async (id: string, body: Partial<Pick<IProduct, 'name' | 'price'>>): Promise<IProduct | null> => {
  await Product.findByIdAndUpdate(id, body);

  return Product.findById(id);
};

export const deleteProduct = async <T>(id: T): Promise<T> => {
  await Product.deleteOne({ _id: id });

  return id;
};
