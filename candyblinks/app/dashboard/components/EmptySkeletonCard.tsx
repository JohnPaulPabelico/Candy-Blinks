import Image from "next/image";

interface EmptySkeletonCardProps {
  loading: boolean;
  isBlinksFound: boolean;
}

const EmptySkeletonCard: React.FC<EmptySkeletonCardProps> = ({
  loading,
  isBlinksFound,
}) => {
  return (
    <div
      className={`mr-5 mt-5 bg-neutral-900 border-pink-950 border-2 p-5 text-white rounded-xl w-fit hover:shadow-lg hover:shadow-pink-900/50 hover:border-pink-900 transition duration-200 opacity-50 ${
        !loading && !isBlinksFound ? "block" : "hidden"
      }`}
    >
      <div>
        <div className="flex justify-center aspect-square overflow-hidden rounded-lg">
          <Image
            src="/CandyBlinks.png"
            alt="logo"
            width={300}
            height={300}
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-4 text-xl font-bold flex justify-center text-neutral-600">
        <span className="">No Candy Blinks Found</span>
      </div>
    </div>
  );
};

export default EmptySkeletonCard;
