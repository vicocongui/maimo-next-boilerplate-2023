import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ShowCard from "./ShowCard";

export const Carrousel = ({ showsArray }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      {showsArray.map((actualShow, index) => {
        return (
          <SwiperSlide key={index}>
            <ShowCard actualShow={actualShow}  />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};