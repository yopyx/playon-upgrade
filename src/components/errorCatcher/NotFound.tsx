const NotFound = () => {
  //const { pathname } = useLocation();
  return (
    <div className="w-full h-[calc(100vh-9rem)] flex justify-center items-center">
      {/* <div className="">
        <h2 className="text-xl font-semibold">No results found</h2>
        <p className="">Try different keywords or suggestions</p>
      </div> */}
      <div className="w-80">
        <img
          src="/notFound2.png"
          alt="not found icon"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default NotFound;
