import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { UserDataContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [errorPath, setErrorPath] = useState('');

    const {user , setUser} = React.useContext(UserDataContext);
    const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setErrorPath('');
    if (password !== confirm) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
        email,
        password,
        username: name,

      });

    if(response.status === 201){
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  }catch (error) {
    

     setError(error.response?.data?.message ||error.response?.data?.errors?.[0]?.msg  || 'An error occurred');
    setErrorPath(error.response?.data?.errors?.[0]?.path || 'email');
    
  }

    console.log('Register:', { email, password });
    // TODO: Add register API integration
  };

  return (
    <AuthLayout>
       <Nav/>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Create an Account</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Register
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-700 underline">
          Login here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
