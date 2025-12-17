import { Navigate, Outlet } from "react-router-dom";
import authStore from "../../store/authStore";

const PrivateRequset = () => {
  const { access } = authStore();

  if (!access) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRequset;
