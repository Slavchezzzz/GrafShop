import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { BrandsData } from "../components/data/BrandsData.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/Infinity.css";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function InfinitySlider() {
  return (
    <div className="slider">
      <div className="page-card-info">
        <h1>Бренды</h1>
      </div>
      <div className="slider-all">
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
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
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {BrandsData.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="Brands-item">
                <div className="Brand-image">
                  <img src={brand.img} alt={brand.name} />
                </div>
                <div className="Brand-discription">
                  <h1>{brand.name}</h1>
                  <span>{brand.discription}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
