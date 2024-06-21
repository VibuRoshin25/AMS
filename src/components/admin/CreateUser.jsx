import { useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Button from "../Button";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");

  const generateID = async () => {
    try {
      const collectionRef = collection(db, "employees");
      const querySnapshot = await getDocs(collectionRef);

      if (querySnapshot.size === 0) {
        return "FP1";
      }

      const docsLength = querySnapshot.docs.length;
      const id = `FP${docsLength + 1}`;
      return id;
    } catch (error) {
      console.error("Error retrieving documents: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // data to be passed within the new collection
      const data = { name: name, department: dept, role: role };
      const id = await generateID();
      // creating a reference for "employees" DB
      const collectionRef = collection(db, "employees");
      const docRef = doc(collectionRef, id);
      await setDoc(docRef, data);

      console.log(docRef);
      alert("Document written!!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>name</label>
      <input
        className="border"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>department</label>
      <input
        className="border"
        type="text"
        onChange={(e) => {
          setDept(e.target.value);
        }}
      />
      <label>role</label>
      <input
        className="border"
        type="text"
        onChange={(e) => {
          setRole(e.target.value);
        }}
      />
      <Button type="submit">add</Button>
    </form>
  );
};

export default CreateUser;
