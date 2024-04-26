export default function LogoPoster() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url("poster-background.png")' }}
    >
      <div
        className="w-1/3 h-full flex flex-col justify-center items-center"
        style={{ paddingBottom: 80 }}
      >
        <img alt="GEWIS" src="/gewis-color.svg" className="gewis-logo" />
      </div>
    </div>
  );
}
