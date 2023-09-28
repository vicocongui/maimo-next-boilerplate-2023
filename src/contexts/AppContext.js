import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [show, setShow] = useState({});
  const [episodesBySeason, setEpisodesBySeason] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  const getShows = useCallback(async () => {
    setLoading(true);
    try {
      const showsReq = await axios.get(`https://api.tvmaze.com/shows`);
      setShows(showsReq.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getShows();
  }, [getShows]);

  const getShow = useCallback(async (id) => {
    setShowLoading(true);
    try {
      const show = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      console.log(show.data);
      setShow(show.data);
      setShowLoading(false);
    } catch (error) {
      console.log("ERRORRR NO EXISTE SHOW");
    }
  }, []);

  const getSeasons = useCallback(async (id) => {
    try {
      const seasonResponse = await axios.get(
        `https://api.tvmaze.com/shows/${id}/seasons`
      );
      console.log("Temporada:", seasonResponse.data);
      //setSeasons(seasonResponse.data);
      return seasonResponse.data;
    } catch (error) {
      console.log("ERRORRR NO EXISTEN SEASONS");
    }
  }, []);

  const getEpisodes = useCallback(async (seasons) => {
    try {
      const episodios = seasons.map((season) =>
        axios.get(`https://api.tvmaze.com/seasons/${season.id}/episodes`)
      );
      //el PromiseAll, va a esperar que se cumplan todas las peticiones de axios para desp recien tener toda la data
      const episodiosResponses = await Promise.all(episodios);
      const allEpisodes = episodiosResponses.map((response) => response.data);
      console.log("Episodios:", allEpisodes);
      setEpisodesBySeason(allEpisodes);
    } catch (error) {
      console.log("ERRORRR NO EXISTEN EPISODIOS");
    } finally {
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        shows,
        loading,
        getShow,
        show,
        showLoading,
        getSeasons,
        seasons,
        episodesBySeason,
        getEpisodes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContexts must be used within a AppContextProvider");
  }
  return context;
};

export default AppContext;