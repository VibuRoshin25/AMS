const ProfileCard = ({ bgClass, label, value }) => {
  return (
    <>
      <div
        className={`${bgClass} text-white flex flex-col justify-center p-4 rounded shadow`}
      >
        <h3 className="text-xl font-semibold mb-2">{label}</h3>
        <p className="text-lg">{value}</p>
      </div>
    </>
  );
};

export default ProfileCard;
