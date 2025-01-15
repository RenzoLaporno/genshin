import { Character } from "../../types/genshinTypes";
import background from "../../assets/background.jpg";
interface CardProps {
  name: string;
  image:string
  rarity:number;
  description:string;
}

const Card: React.FC<CardProps> = ({ name,image,description }) => {
  console.log(image)
  return (
    <div className=" rounded overflow-hidden shadow-lg bg-white">
        <div className="flex justify-center items-center">
        <img className="object-cover" src={image} alt="Image" />
      </div>
      
      <div className="px-6 py-4">
        <div className=" font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
        {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};
export default Card;
