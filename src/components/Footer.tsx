const Footer = () => {
  return (
    <div className="space-y-5">
      <div className="info-container">
        {[
          "About",
          "Press",
          "Copyright",
          "Contact us",
          "Creator",
          "Advertise",
          "Developers",
        ].map((e) => (
          <p key={e}>{e}</p>
        ))}
      </div>
      <div className="info-container">
        {[
          "Terms",
          "Privacy",
          "Policy & Safety",
          "How PLAY ON works",
          "Test new features",
        ].map((e) => (
          <p key={e}>{e}</p>
        ))}
      </div>
    </div>
  );
};

export default Footer;
