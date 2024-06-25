import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchData();
  }, [collectionName, db]);

  return data;
};

export default useFetchCollection;
