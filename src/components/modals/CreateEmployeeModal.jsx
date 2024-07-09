import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Button from "../Button";
import CustomModal from "./Modal";
import { signUp } from "../../services/authService";
import LabeledInput from "../LabeledInput";
import { selectRoles } from "../../store/rolesSlice";
import { selectDepartments } from "../../store/departmentsSlice";
import { validateEmail, validatePassword } from "../../utils/validationMethods";
import { useSelector } from "react-redux";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";

const CreateEmployeeModal = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = useSelector(selectRoles);
  const departments = useSelector(selectDepartments);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showErrorToast("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      showErrorToast(
        "Password must be 6-12 characters long, include uppercase and lowercase letters, and a number"
      );
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    try {
      const data = {
        name,
        department: dept,
        role: role,
        email: email,
      };

      const collectionRef = collection(db, "employees");
      const docRef = doc(collectionRef, id);
      await setDoc(docRef, data);

      await signUp(email, password);

      showSuccessToast("Employee added successfully!");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to add employee.");
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
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <LabeledInput
            label="Name"
            value={name}
            onChange={setName}
            type="text"
            placeholder="Enter name"
          />
          <LabeledInput
            label="Employee ID"
            value={id}
            onChange={setId}
            placeholder="Enter Employee Id"
            type="text"
          />
          <LabeledInput
            label="Department"
            value={dept}
            onChange={setDept}
            options={departments}
            type="select"
          />
          <LabeledInput
            label="Role"
            value={role}
            onChange={setRole}
            options={roles}
            type="select"
          />
          <LabeledInput
            label="Admin"
            value={isAdmin}
            onChange={setIsAdmin}
            type="checkbox"
          />

          <LabeledInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter email"
            type="email"
          />
          <LabeledInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter password"
            type="password"
          />
          <LabeledInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm password"
            type="password"
          />
          <Button type="submit">Create Employee</Button>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateEmployeeModal;
