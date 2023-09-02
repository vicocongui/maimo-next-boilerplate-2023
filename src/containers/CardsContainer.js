import ShowCard from '@/components/ShowCard';
import { useAppContext } from '@/contexts/AppContext';

const CardsContainer = () => {
  const { shows, loading } = useAppContext();
  return (
    <section>
      <h2>Shows</h2>
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-5 px-2"> 
          {shows.map((actualShow, index) => {
            return <ShowCard actualShow={actualShow} key={index} />;
          })}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </section>
  );
};

export default CardsContainer;