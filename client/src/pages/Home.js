import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p>
        <Link to="/products" className="App-link">
          VIEW PRODUCTS
        </Link>
      </p>
    </div>
  );
};

export default Home;
