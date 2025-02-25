const Map = () => {
  return (
    <div className="space-y-4 border-2 rounded-lg">
      <div className="bg-primary text-white flex justify-center text-3xl py-2 rounded-t-lg">
        <strong>Hub</strong>&nbsp;
        {formatHub(session?.user.choosed_station || session?.user.station)}
      </div>
      <Link
        href={`http://maps.google.com/?q=${mapInfo.latitude},${mapInfo.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <div className="relative">
          <Image
            src={mapInfo.map}
            alt="Mapa da região de atuação"
            width={600}
            height={400}
            className="rounded-lg border-2 border-[--background]"
          />
          <span className="absolute bottom-2 right-2 text-xs italic bg-white bg-opacity-75 px-2 py-1 rounded">
            *Região de atuação aproximada
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="text-primary" />
          <p className="text-base">
            Endereço: <strong>{mapInfo.address}</strong>
          </p>
        </div>
      </Link>
    </div>
  );
};
