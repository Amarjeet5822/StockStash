import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setGoogleIsAuthenticated } from '../RTK/features/authSlice';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // console.log("params" , params)
    const token = params.get('token');
    // console.log("token => ",token)
    if (token) {  
      navigate('/');
    }
  }, []);

  return (
    <div>
      {/* Dashboard content */}
      
    </div>
  );
};

export default DashboardPage;
