import Link from "next/link";
import Image from "next/image";

const ShowCard = ({ actualShow }) => {
  const { name, id } = actualShow;
  return (
    <div className="w-full h-[500px] text-white flex flex-col justify-between relative border-solid">
      <Image
        src={actualShow.image?.original}
        width={680}
        height={1000}
        alt={actualShow.name}
        className="h-[85%]  object-cover w-full p-2"
      />
      <div className="flex flex-col items-center justify-center h-[15%] p-2 w-full">
        <h2 className="text-xl text-white">{name}</h2>
        <Link href={`/show/${id}`}>View Show</Link>
      </div>
    </div>
  );
};

export default ShowCard;