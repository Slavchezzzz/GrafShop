import { Link } from "react-router-dom";
import "../styles/BrandCard.css";

export default function BrandCard({ brand }) {
  return (
    <div className="pagecard-item">
      <Link to={`/BrandCardPage/${brand.id}`} className="pagecard-image-link">
        <img
          src={brand.img}
          alt={brand.title}
          className="brandpage-image"
          onError={(e) => (e.target.src = "/images/default-brand.jpg")}
        />
      </Link>
      <div className="pagecard-title">{brand.title}</div>
      <div className="pagecard-description">
        <span className="pagecard-text">{brand.description}</span>
      </div>
    </div>
  );
}
