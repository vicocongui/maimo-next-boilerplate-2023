import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAppContext } from "@/contexts/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ShowCard from "./ShowCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const ShowSingleCard = ({ show }) => {
  //Ya no usariamos 'seasons' acá... asi que lo saqué
  const { shows, loading, getSeasons, episodesBySeason, getEpisodes } =
    useAppContext();

  const [showsFiltrados, setShowFiltrados] = useState([]);
  console.log(show.genres, "Show Seleccionado");

  function generosCoincidentes(show, showSeleccionado) {
    return showSeleccionado.genres.filter((gen) => show.genres.includes(gen))
      .length;
  }
  useEffect(() => {
    const resultFilter = shows.filter(
      (el) => show.genres.every((genero) => el.genres.includes(genero))
      //show es showSeleccionado, show.genres mis generes seleccionados, .every todos mis generos tienen que cumplir ( => )
    );
    if (resultFilter.length < 2) {
      const resultFilter2genres = shows.filter(
        (serie) => generosCoincidentes(serie, show) >= 2
      );

      console.log(resultFilter2genres, "2gen result filter");
      setShowFiltrados(
        resultFilter2genres.filter((serie) => serie.id != show.id)
      );
      return;
    }

    console.log(resultFilter, "Result Filter");
    setShowFiltrados(resultFilter);
  }, [shows]);
  // LE agregue que la funcion getSeasons devuelva con un return...
  // de esa manera esperamos que tenga todas las temporadas y recien se la manda a GetEpisodes
  useEffect(() => {
    async function fetchSeasonsAndEpisodes() {
      const fetchedSeason = await getSeasons(show.id);
      await getEpisodes(fetchedSeason);
    }
    fetchSeasonsAndEpisodes();
  }, [show.id, getSeasons, getEpisodes]);

  return (
    <div className="relative">
      <Navbar btnBack />
      {/* Hero */}
      <section className="w-full h-screen bg-red-200 relative">
        <div className="">
          {!loading ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={5}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={false}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              {episodesBySeason[0] &&
                episodesBySeason[0].map((actualShow, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {/* <ShowCard actualShow={actualShow} /> */}

                      <Image
                        src={actualShow.image?.original}
                        width={680}
                        height={1000}
                        alt={actualShow.name}
                        className="w-full h-screen object-cover"
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          ) : (
            <div> CARGANDO....</div>
          )}
          <div className="bg-slate-800/50 absolute top-0 w-full h-screen z-10"></div>
        </div>

        <div className="absolute bottom-20 left-20 z-20 text-4xl">
          <h2>{show.name}</h2>
        </div>
      </section>
      {/* Summary */}
      <section className="w-full h-[40vh]">
        <div className="w-[85%] mx-auto text-center h-[40vh]  mt-8 overflow-y-scroll py-10 px-8">
          <h2 className="text-3xl mb-8 uppercase font-bold">Summary</h2>
          <div dangerouslySetInnerHTML={{ __html: show.summary }}></div>
          <p>Termino en : {show.ended}</p>
        </div>
      </section>
      {/* Filtros */}
      <section>
        <h3 className="mt-8 px-10 text-4xl">Podría Interesarte</h3>

        <section>
          <h2>Shows</h2>
          {/* {!loading && ( */}
          <div className="mg-5 px-2 py-4">
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
              {showsFiltrados.length > 0 &&
                showsFiltrados.map((actualShow, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <ShowCard actualShow={actualShow} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          {/* Silencié esto un toque para probar este nuevo mapeo */}
          {/* <div className="px-2 py-4">
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
              {episodesBySeason.length > 0 && //[ [ 8 el],[ 8 el],[ 8 el],[ 8 el],[ 8 el],[ 8 el],[ 8 el], ]
                episodesBySeason.map((episode, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <span>Temporada: - cap:{episode[index].name}</span>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div> */}
          {episodesBySeason.map((seasonEpisodes, index) => (
            <div key={index}>
              <h3>Temporada {index + 1}</h3>
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={10}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
              >
                {seasonEpisodes.map((episode) => (
                  <SwiperSlide key={episode.id}>
                    {/* Acá podemos renderizar cada episodio como prefieras */}
                    <div>
                      <h4>{episode.name}</h4>
                      <img src={episode.image?.medium} alt={episode.name} />
                      {/* <p>{episode.summary}</p> */}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}

          {/* {loading && <p>Loading...</p>} */}
        </section>
      </section>
    </div>
  );
};

// Pendiente Filtrar por tipo de la serie actual. En un Swiper

export default ShowSingleCard;

{
  /* <h2>{show.name}</h2>
{show.image && (
  <Image 
    src={show.image?.original}
    width={680}
    height={1000}
    alt={show.name}
  />
)} */
}