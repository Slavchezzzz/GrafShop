import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { BrandsData } from "../components/data/BrandsData.jsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../styles/Infinity.css";

// import required modules
import { Pagination } from "swiper/modules";

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
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {BrandsData.map((BrandsData, index) => {
            return (
              <SwiperSlide>
                <div className="Brands-item" key={index}>
                  <div className="Brand-image">
                    <img src={BrandsData.img} />
                  </div>
                  <div className="Brand-discription">
                    <h1>{BrandsData.name}</h1>
                    <span>{BrandsData.discription}</span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
