import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ITEMS_PER_PAGE = 3;

function Minuman({ handleAddToCart }) {
  const [minuman, setMinuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from server....");
        const response = await axios.get('http://localhost:3000/api/minuman');
        console.log("Data fetched: ", response.data);
        const filteredData = response.data.filter(item =>
          search.toLowerCase() === "" ||
          item.nama.toLowerCase().includes(search.toLowerCase())
        );
        setMinuman(filteredData);
        setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching data ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Cari menu..."
          className="input input-bordered focus:outline-sky-500 m-4 w-40 md:w-auto"
          onChange={handleSearchChange}
          value={search}
        />
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="card card-compact w-80 bg-base-100 shadow-xl mb-4 mx-auto"
              >
                <figure>
                  <Skeleton height={200} width={200} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    <Skeleton width={150} />
                  </h2>
                  <p>
                    <Skeleton count={3} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 md:grid md:grid-cols-3">
            {minuman.filter((item) =>
              search.toLowerCase() === "" ||
              item.nama.toLowerCase().includes(search.toLowerCase())
            ).map((item, index) => (
              <div
                key={index}
                className="card card-compact w-72 bg-amber-900 mx-auto shadow-xl mt-20"
              >
                <figure>
                  <img
                    src={item.img}
                    width={200}
                    height={200}
                    className="rounded-xl mt-5 hover:scale-110 transition-al ease-in-out duration-300"
                    alt={item.nama}
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="font-semibold text-2xl">{item.nama}</h2>
                  <p>IDR {item.harga}</p>
                </div>
                <button className="btn btn-sm btn-primary" onClick={() => handleAddToCart(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Minuman;
