import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { BrandsData } from "../components/data/BrandsData.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/Infinity.css";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useBrands } from "../hooks/useBrands";
import BrandCard from "./BrandCard";

export default function InfinitySlider() {
  const { brands, loading, error } = useBrands();

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="slider">
      <div className="page-card-info">
        <h1>Бренды</h1>
      </div>
      <div className="slider-all">
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={2}
          grabCursor={true}
          loop={true}
          speed={800}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 1
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 2
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 2
            }
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <BrandCard brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
