import Link from 'next/link';
import Image from 'next/image';

const ShowCard = ({ actualShow }) => {
  const { show } = actualShow;
  const { name, id } = show;
  return (
    <div className='show_container w-full mx-auto h-[500px] text-white flex flex-col justify-between relative border-solid'>
      <Image 
          src={show.image?.original}
          width={680}
          height={1000}
          alt={show.name}
        />
        <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl text-white" >{name}</h2>
        <Link href={`/show/${id}`}>View Show</Link>
        </div>
    </div>
  );
};

export default ShowCard;