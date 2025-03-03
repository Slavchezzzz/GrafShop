import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Category.css";
import { Link } from "react-router-dom";

export default function CategoryBlock() {
  return (
    <div className="container">
      <div className="category-des ">
        <h2>Категории товаров</h2>
      </div>
      <div className="px-4 py-5" id="custom-cards">
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4">
          <div className="col">
            <div className="my-card card card-cover overflow-hidden rounded-4 shadow-lg">
              <img src="./category/category-slide.png" alt="" />
              <div className="d-flex  text-shadow-1">
                <div className="category-text">
                  <h1 className="">Маркеры</h1>
                  <Link className="text-white" to={"/Marker"}>
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col ">
            <div className="my-card card card-cover overflow-hidden rounded-4 shadow-lg">
              <img src="./category/category-slide2.png" alt="" />
              <div className="d-flex  text-shadow-1">
                <div className="category-text">
                  <h1 className="">Граффити</h1>
                  <Link className="text-white" to={"/test"}>
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="my-card card card-cover overflow-hidden rounded-4 shadow-lg">
              <img src="./category/category-slide3.png" alt="" />
              <div className="d-flex text-shadow-1">
                <div className="category-text">
                  <h1 className="">Акссесуары</h1>
                  <Link className="text-white" to={"/accessories"}>
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
