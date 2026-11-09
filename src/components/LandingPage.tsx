const LandingPage = () => {
  return (
    <div className="w-screen justify-center items-left bg-black">
      <div className="w-full flex justify-center absolute mt-14 -z-10">
        <img
          alt="background"
          src={"/www.canva.com_design.png"}
          className="object-cover"
        />
      </div>

      <div className="w-[60%] flex justify-center py-4 bg-[#6F2BBB]">
        <div className="w-32 h-6 mobile:logo-mobile tablet-s:logo-tablet-s">
          <img alt="logo" src={"/play-on.png"} className="object-cover" />
        </div>
        {/* <button
          className="px-2 py-1 font-bold bg-yellow-600 border-2 border-indigo-800 text-white rounded-md hover:bg-violet-800"
          onClick={() => {
            window.open("https://localhost:7117/login", "_self");
          }}
        >
          Sign in
        </button> */}
      </div>
      <div className="w-full flex absolute justify-center">
        <button
          className="px-5 py-2 my-auto mt-[500px] font-bold bg-yellow-600 border-2 border-indigo-800 text-white hover:bg-[#6F2BBB] mobile:text-sm"
          onClick={() => {
            window.open(
              import.meta.env.VITE_ENVIRONMENT == "development"
                ? "http://localhost:7117/login"
                : "https://playon-auth.runasp.net/login",
              "_self",
            );
          }}
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
