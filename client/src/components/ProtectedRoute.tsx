import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLogin, loading } = useContext(AppContext);

  if (loading) {
    return null; // or return a loading spinner
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
