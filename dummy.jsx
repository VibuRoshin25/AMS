import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../services/authService";
import Button from "../buttons/Button";
import CustomModal from "./Modal";
import LabeledInput from "../LabeledInput";
import {
  createEmployee,
  setName,
  setId,
  setDept,
  setRole,
  setEmail,
  setIsAdmin,
  setPassword,
  employeeData,
} from "../../store/createEmployeeSlice";
import { selectRoles } from "../../store/rolesSlice";
import { selectDepartments } from "../../store/departmentsSlice";
import { validateEmail, validatePassword } from "../../utils/validationMethods";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";

const CreateEmployeeModal = () => {
  const dispatch = useDispatch();
  const { employee, loading, error } = useSelector(employeeData);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = useSelector(selectRoles);
  const departments = useSelector(selectDepartments);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(employee.email)) {
      showErrorToast("Invalid email format");
      return;
    }

    if (!validatePassword(employee.password)) {
      showErrorToast(
        "Password must be 6-12 characters long, include uppercase and lowercase letters, and a number"
      );
      return;
    }

    if (employee.password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    try {
      await dispatch(createEmployee(employee)).unwrap();
      await signUp(employee.email, employee.password);

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
            value={employee.name}
            onChange={(e) => dispatch(setName(e.target.value))}
            type="text"
            placeholder="Enter name"
          />
          <LabeledInput
            label="Employee ID"
            value={employee.id}
            onChange={(e) => dispatch(setId(e.target.value))}
            placeholder="Enter Employee ID"
            type="text"
          />
          <LabeledInput
            label="Department"
            value={employee.dept}
            onChange={(e) => dispatch(setDept(e.target.value))}
            options={departments}
            type="select"
          />
          <LabeledInput
            label="Role"
            value={employee.role}
            onChange={(e) => dispatch(setRole(e.target.value))}
            options={roles}
            type="select"
          />
          <LabeledInput
            label="Admin"
            checked={employee.isAdmin}
            onChange={(e) => dispatch(setIsAdmin(e.target.checked))}
            type="checkbox"
          />
          <LabeledInput
            label="Email"
            value={employee.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            placeholder="Enter email"
            type="email"
          />
          <LabeledInput
            label="Password"
            value={employee.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            placeholder="Enter password"
            type="password"
          />
          <LabeledInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Employee"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateEmployeeModal;
