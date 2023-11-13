import React, { useState } from 'react';
import intro from '../assets/images/intro.png';
import Header from '../components/header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8003/login', { email, password });
      console.log('Login bem-sucedido:', response.data);
      navigate(`/profile/${response.data._id}`);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <>
      <div className="absolute w-full h-20 bg-red-400 overflow-hidden">
        <Header />
      </div>
      <div className="w-full min-h-screen h-full flex items-center justify-center bg-primary p-5">
        <div className="w-full max-w-7xl m-auto">
          <div className="flex w-full justify-center flex-wrap py-20 gap-10">
            <div className="flex-1 min-w-[300px]">
              <img src={intro} alt="" className="object-fill w-[85%]" />
            </div>
            <div className="flex-1 min-w-[300px]">
              <h1 className="text-2xl font-bold text-white pb-5">Realize seu login</h1>
              <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                <input
                  className="h-14 p-5 rounded-md"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="h-14 p-5 rounded-md"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="h-14 rounded-md bg-secundarydark text-xl text-white">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
