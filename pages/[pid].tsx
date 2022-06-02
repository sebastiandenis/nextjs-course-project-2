import { GetStaticPaths, GetStaticProps } from 'next';
import { Fragment } from 'react';
import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props: any) => {
  const { loadedProduct } = props;
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

export const getData: any = async (context: any) => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return data;
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const product = data.products.find(
    (product: any) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product
    }
  };
};

export const getStaticPaths: GetStaticPaths = async (context: any) => {
  const data = await getData();
  const ids = data.products.map((product: any) => product.id);
  const pathsWithParams = ids.map((id: string) => ({params: {pid: id}}));
  return {
    paths: pathsWithParams,
    fallback: false // it can be false or blocking also
  };
};

export default ProductDetailPage;
