import ShowCard from "@/components/ShowCard";
import { useAppContext } from "@/contexts/AppContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CardsContainer = () => {
  const { shows, loading } = useAppContext();

  return (
    <section>
      <h2>Shows</h2>
      {!loading && (
        <div className="px-2 py-4">
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
            {shows.map((actualShow, index) => {
              return (
                <SwiperSlide>
                  <ShowCard actualShow={actualShow} key={index} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        // <div className="grid md:grid-cols-2 lg:grid-cols-5 px-2">

        // <
      )}
      {loading && <p>Loading...</p>}
    </section>
  );
};

export default CardsContainer;