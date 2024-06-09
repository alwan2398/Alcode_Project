const WelcomeBanner = () => {
  return (
    <div className="flex gap-2 justify-between items-center bg-white rounded-xl w-full p-4 shadow-md">
      <div className="md:text-center md:flex-1">
        <h2 className="font-bold text-[16px] md:text-[28px]">Welcome To <span className="text-primary font-primaryFont">AlCode</span> Project</h2>
        <h2 className="text-gray-500 text-[12px] md:text-[16px] mt-1">Explore dan lihat semua project</h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
