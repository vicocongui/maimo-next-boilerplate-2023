import { useAppContext } from "@/contexts/AppContext";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import { Carrousel } from "./Carrousel";
import ShowCard from "./ShowCard";
import { HeroCard } from "./HeroCard";
import "swiper/css/effect-coverflow";
const Hero = () => {
  const { shows, loading } = useAppContext();
  const [showsFiltrados, setShowsFiltrados] = useState([]);

  useEffect(() => {
    const showsOrdenados = shows.sort(
      (a, b) => b.rating.average - a.rating.average
    );
    const ultimos3Shows = showsOrdenados.slice(0, 5);
    setShowsFiltrados(
      shows.sort((a, b) => b.rating.average - a.rating.average).slice(0, 5)
    );
  }, [shows]);

  return (
    <div className="px-2 py-2">
      {!loading && (
        <Swiper
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          slidesPerView={3}
          loop={true}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
          className="mySwiper"
        >
          {showsFiltrados.map((actualShow, index) => {
            return (
              <SwiperSlide key={index}>
                <HeroCard heroShow={actualShow}  />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default Hero;