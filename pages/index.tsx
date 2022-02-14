import type { GetStaticProps, NextPage } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { ReactNode } from 'react';
import Link from 'next/link';

const Home = (props: { products: Array<{}>; children: ReactNode }) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product: any) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  console.log('Regenerating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products
    },
    revalidate: 10
  };
};

export default Home;
