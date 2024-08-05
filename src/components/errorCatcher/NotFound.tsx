const NotFound = () => {
  return (
    <div className="flex flex-col mx-auto">
      <img
        src="../../../public/notFoundIcon.png"
        alt="not found icon"
        className="w-[800px] object-cover"
      />
      <div className="flex flex-col mx-auto -mt-52">
        <h2 className="text-xl mx-auto font-semibold">No results found</h2>
        <p className="mx-auto">
          Try different keywords or remove search filters
        </p>
      </div>
    </div>
  );
};

export default NotFound;
