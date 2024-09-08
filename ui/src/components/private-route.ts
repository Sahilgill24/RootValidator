import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

const PrivateRoute = () => {
  const { isConnected } = useAccount(); // Check if the user is authenticated

  return isConnected ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;