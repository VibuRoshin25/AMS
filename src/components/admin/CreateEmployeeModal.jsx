import { useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Button from "../Button";
import CustomModal from "../Modal";
import { toast } from "react-toastify";
import { signUp } from "../../services/authService";
import LabeledInput from "../LabeledInput";

const CreateEmployeeModal = () => {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const departments = ["IT", "HR", "Accounts", "MIS", "Engineering"];
  const roles = [
    "Junior Software Developer",
    "Senior Software Developer",
    "Manager",
    "MIS",
    "Intern",
    "Trainee",
    "Junior HR",
    "Senior HR",
  ];

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be 6-12 characters long, include uppercase and lowercase letters, and a number",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const data = {
        name,
        department: dept,
        role: role,
        email: email,
      };
      const id = await generateID();

      const collectionRef = collection(db, "employees");
      const docRef = doc(collectionRef, id);
      await setDoc(docRef, data);

      await signUp(email, password);

      toast.success("Employee added successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add employee.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>Create Employee</Button>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <LabeledInput
            label="Name"
            value={name}
            onChange={setName}
            placeholder="Enter name"
          />
          <LabeledInput
            label="Department"
            value={dept}
            onChange={setDept}
            options={departments}
          />
          <LabeledInput
            label="Role"
            value={role}
            onChange={setRole}
            options={roles}
          />
          <LabeledInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter email"
          />
          <LabeledInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter password"
          />
          <LabeledInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm password"
          />
          <Button type="submit">Create Employee</Button>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateEmployeeModal;
