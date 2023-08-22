import { useAppContext } from '@/contexts/AppContext';
import Link from 'next/link';

const HomeContainer = () => {
  const { shows, loading } = useAppContext();
  return (
    <div>
      <h2>Shows</h2>
      {!loading && (
        <div>
          {shows.map((actualShow, index) => {
            return (
              <div key={index} className='show_container'>
                <h2>{actualShow.show.name}</h2>
              </div>
            );
          })}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default HomeContainer;