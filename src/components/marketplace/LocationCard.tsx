interface LocationCardProps {
  name: string;
  image: string;
  salonCount: number;
  onClick?: () => void;
}

const LocationCard = ({ name, image, salonCount, onClick }: LocationCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display text-xl text-card mb-1">{name}</h3>
        <p className="text-card/70 text-sm">{salonCount} salons</p>
      </div>
    </button>
  );
};

export default LocationCard;
