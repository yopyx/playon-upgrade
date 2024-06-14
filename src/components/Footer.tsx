const Footer = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap space-x-2 font-semibold text-xs">
        {[
          "About",
          "Press",
          "Copyright",
          "Contact us",
          "Creator",
          "Advertise",
          "Developers",
        ].map((e) => (
          <p key={e} className="inline-block ml-2 cursor-pointer">
            {e}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap space-x-2 font-semibold text-xs">
        {[
          "Terms",
          "Privacy",
          "Policy & Safety",
          "How YouTube works",
          "Test new features",
        ].map((e) => (
          <p key={e} className="inline-block ml-2 cursor-pointer">
            {e}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Footer;
