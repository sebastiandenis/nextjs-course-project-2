import type { GetStaticProps, NextPage } from 'next';

const Home: NextPage = (props: {products: Array<{}>}) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product: any) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: [
        {
          id: 'p1',
          title: 'Product 1'
        }
      ]
    }
  };
};

export default Home;
