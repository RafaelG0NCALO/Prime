import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header/Header';

const UpdatePassword = () => {
  const { id } = useParams();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8003/profile/${id}/update-password`, {
        currentPassword, // Certifique-se de que currentPassword e newPassword estejam formatados corretamente
        newPassword,
      });
      navigate(`/login`);
      setMessage(response.data);
    } catch (error) {
      console.error(error); // Exiba o erro no console para depuração
      setMessage("Ocorreu um erro ao alterar a senha");
    }
  };

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-primary p-5">
       <div className='absolute top-0 left-0 w-full h-16 overflow-hidden'>
        <Header />
      </div>
      <div className="w-full max-w-4xl m-auto">
      <h2 className='text-center text-3xl pb-4 font-semibold text-white'>Alterar Senha</h2>
      <div className='flex flex-col pb-5'>
        <label className='text-textinprimary' htmlFor="currentPassword">Senha Atual:</label>
        <input
          className='h-14 rounded-md p-3'
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className='flex flex-col pb-5'>
        <label className='text-textinprimary' htmlFor="newPassword">Nova Senha:</label>
        <input
          className='h-14 rounded-md p-3'
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className='flex flex-col pb-5'>
        <label className='text-textinprimary' htmlFor="confirmNewPassword">Confirmar Nova Senha:</label>
        <input
          className='h-14 rounded-md p-3'
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button
      className='bg-secundarydark w-full h-14 text-xl text-white rounded-md mt-3'
       onClick={handleChangePassword}>Alterar Senha</button>
      <p>{message}</p>
      </div>
    </div>
  );
};

export default UpdatePassword;
