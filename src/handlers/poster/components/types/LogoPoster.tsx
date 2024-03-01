export default function LogoPoster() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden">
      <div className="w-1/3 h-full" style={{ paddingBottom: 80 }}>
        <svg width="100%" height="100%">
          <image x="0" y="0" width="100%" height="100%" xlinkHref={'gewis-color.svg'}/>
        </svg>
      </div>
    </div>
  );
}
