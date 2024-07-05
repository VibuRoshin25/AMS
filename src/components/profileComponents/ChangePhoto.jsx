import { useState } from "react";
import storage from "../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ChangePhoto({ userId }) {
  const [image, setImage] = useState(null);

  const upload = async () => {
    if (!image) {
      alert("No file selected");
      return;
    }

    if (image.size / 1024 / 1024 > 2) {
      alert("File size exceeds 2 MB");
      return;
    }

    if (!userId) {
      console.error("User ID is not defined");
      return;
    }

    const imageRef = ref(storage, `ams-profile-pics/${userId}`);

    try {
      await uploadBytes(imageRef, image);
      alert("Upload success");
      const downloadURL = await getDownloadURL(imageRef);
      console.log("File available at", downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="relative">
      <input
        id="myInput"
        type="file"
        hidden
        accept="image/png"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      {image === null && (
        <button
          onClick={() => document.getElementById("myInput").click()}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold h-full aspect-square px-2 py-1 rounded-full"
        >
          +
        </button>
      )}
      {image && (
        <button
          onClick={() => upload()}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold h-full aspect-square px-2 py-1 rounded-full"
        >
          Confirm
        </button>
      )}
    </div>
  );
}

export default ChangePhoto;
