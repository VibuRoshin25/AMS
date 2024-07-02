import defaultpfp from "../assets/default-pfp.svg";

const ProfilePhoto = () => {
  return (
    <img
      src={defaultpfp}
      alt="Profile"
      className="w-24 h-24 rounded-full border-4 border-sky-500"
    />
  );
};

export default ProfilePhoto;
