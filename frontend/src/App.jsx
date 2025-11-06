import { useEffect, useState } from "react";
import "./styles/App.css"; // make sure to import your CSS

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <h1>FarmPortal Products</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul className="product-list">
          {products.map((p) => (
            <li key={p.id} className="product-card">
              <h2>{p.name}</h2>
              <p>Price: ${p.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
