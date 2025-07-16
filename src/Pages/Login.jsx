import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../Components/AuthLayout';
import { UserDataContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Nav';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [userData , setUserData] = useState({});
  const [error, setError] = useState('');


  const {user , setUser} = React.useContext(UserDataContext);

    const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const userData = {
      email: email,
      password: password,
    }

    try{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, userData);

    if(response.status === 200){
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/');
    }else{
      setError('Invalid email or password');
    }

  }catch(err){
    console.log(err);
    setError('Invalid email or password');
   }



  };

  return (
    <AuthLayout>
      <Nav/>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">WebGenie Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Login
        </button>
        <p className='text-red-500'>{error}</p>
      </form>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-700 underline">
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
