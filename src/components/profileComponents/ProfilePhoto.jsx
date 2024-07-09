import { useState, useEffect } from "react";
import defaultpfp from "../../assets/default-pfp.svg";
import { storage } from "../../firebase/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

const ProfilePhoto = ({ userId }) => {
  const [imageUrl, setImageUrl] = useState(defaultpfp);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getDownloadURL(
          ref(storage, `ams-profile-pics/FP1.png`)
        );
        setImageUrl(url);
      } catch (error) {
        setImageUrl(defaultpfp);
      }
    };

    fetchImageUrl();
  }, [userId]);

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-sky-500">
      <img
        src={imageUrl}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfilePhoto;
