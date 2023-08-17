import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

const Show = () => {
  const router = useRouter();
  const id = router.query.id;
  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getShow = async () => {
      try {
        const show = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        console.log(show.data);
        setShow(show.data);
        setLoading(false);
      } catch (error) {
        console.log('ERRORRR NO EXISTE SHOW');
      }
    };
    if (id) {
      getShow();
    }
  }, [id]);

  return (
    <>
      {loading && <p>LOADING....</p>}
      {!loading && (
        <div>
          <h2>{show.name}</h2>
          {show.image && (
            <Image
              src={show.image?.original}
              width={680}
              height={1000}
              alt={show.name}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Show;

//https://api.tvmaze.com/search/shows?q=batman
