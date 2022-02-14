import { GetStaticProps } from 'next';
import { Fragment } from 'react';
import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props: any) => {
  const { loadedProduct } = props;
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const product = data.products.find(
    (product: any) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product
    }
  };
};

export default ProductDetailPage;
