import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "./useAuth";

const Home = () => {
  return <h1>Home Component</h1>;
};
const Login = () => {
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
  ];
  return (
    <div>
      <h1>Login Component</h1>
      <span>Links to Products: </span>
      {products.map((product) => (
        <Link style={{ display: "grid" }} key={product.id} to={`/products/${product.name}`}>
          {product.name}
        </Link>
      ))}
    </div>
  );
};
const Products = () => {
  const { name } = useParams();

  return (
    <div>
      <h2>Product Name: {name}</h2>
      <Link to="details">Product Details</Link>
      <Outlet />
    </div>
  );
};
const ProductDetails = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>Product Details Component</h1>
      <h2>Product Details: {name}</h2>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{location}}/>;
  } else {
    return children;
  }
};

const LoginBtn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    login();
    navigate(location.state.location.pathname);
  };
  return <button onClick={handleClick}>Login</button>;
};

function App() {
  return (
    <div>
      <header>
        <nav id="navbar">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Login
          </NavLink>
        </nav>
        <LoginBtn />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
              <Login />
          }
        />
        <Route
          path="/products/:name"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
