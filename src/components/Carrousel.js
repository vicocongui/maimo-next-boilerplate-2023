import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ShowCard from "./ShowCard";

const Carrousel = ({showsArray}) => {
  return (
    <Swiper
    slidesPerView={5}
    spaceBetween={25}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    navigation={true}
    modules={[Pagination, Navigation, Autoplay]}
    className="mySwiper"
  >
    {showsArray.map((actualShow, index) => {
      return (
        <SwiperSlide>
          <ShowCard actualShow={actualShow} key={index} />
        </SwiperSlide>
      );
    })}
   </Swiper>
  )
}

export default Carrousel