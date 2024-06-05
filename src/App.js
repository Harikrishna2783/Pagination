import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
    }
  };

  const selectPageHandler = (selectPage) => {
    if (page >= 1 && page <= products.length / 10) {
      setPage(selectPage);
    }
  };

  // console.log(products);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disabled"}
          >
            prev
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
          >
            next
          </span>
        </div>
      )}
    </div>
  );
}
