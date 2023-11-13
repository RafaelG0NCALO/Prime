import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/header/Header'
import { HandWaving } from 'phosphor-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  
  const showDeleteConfirmationPopup = () => {
    setShowDeleteConfirmation(true);
  };
  const closeDeleteConfirmationPopup = () => {
    setShowDeleteConfirmation(false);
  };


  useEffect(() => {
    axios.get(`http://localhost:8003/profile/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);
  
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:8003/profile/${id}/delete`);
      navigate('/');
    } catch (error) {
      // Registre os detalhes do erro no console
      console.error("Erro ao excluir a conta:", error);
  
      // Aqui, você pode tratar o erro de acordo com suas necessidades
    }
  };
  


  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-primary p-5">
      <div className='absolute top-0 left-0 w-full h-16 overflow-hidden'>
        <Header />
      </div>

      <div className="w-full max-w-4xl m-auto">
        {userData ? (
          <>
            <h1 className='text-white text-3xl font-semibold flex gap-3 pb-5'>Bem Vindo <HandWaving size={32} /></h1>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-10">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img src={userData.link} alt="" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-texttitle text-2xl">{userData.nome}</h1>
                    <p className="text-textbase">{userData.materiaSelecionada}</p>
                  </div>
                </div>
                <h2 className="text-textbase pt-8  ">
                  <span className='text-primary font-semibold'>E-mail: </span>
                  {userData.email}</h2>
                <p className="text-textbase py-2 w-full">
                  <span className='text-primary font-semibold'>Bio: </span>
                  {userData.bio}
                </p>
                <p className="text-textbase pb-3">
                  <span className='text-primary font-semibold'>Preço/hora: </span>
                  R$ {userData.custo}</p>
                <div className='flex justify-between flex-wrap'>
                  <div className='flex-1 min-w-[200px]'>
                    <p className="text-textbase">
                      <span className='text-primary font-semibold'>Dia(s) Disponíveis: </span>
                      {userData.diasSelecionado}</p>
                    <p className="text-textbase">
                      <span className='text-primary font-semibold'>whatsapp: </span>
                      {userData.wpp}</p>
                  </div>
                  <div className='flex-1 min-w-[200px]'>
                    <p className="text-textbase">
                      <span className='text-primary font-semibold'>Horário de início: </span>
                      {userData.horarioEntrada}</p>
                    <p className="text-textbase">
                      <span className='text-primary font-semibold'>Horário de Término: </span>
                      {userData.horarioSaida}
                    </p>
                  </div>
                </div>

              </div>
              <div className="bg-[#FAFAFC] max-md:flex-col px-10 py-6 border-t-[1px] flex items-center justify-between">
                <div className='w-full flex flex-wrap gap-3 items-center justify-center'>
                  <Link
                    className='flex-1 min-w-[250px] h-14 flex items-center justify-center bg-primarydarker text-white rounded-md'
                    to={`/profile/${id}/update-password`}>
                    Alterar Senha
                  </Link>
                  <Link
                    to={`/profile/${id}/edit`}
                    className='flex-1 min-w-[250px] h-14 flex items-center justify-center bg-primarylighter text-white rounded-md'>
                    Editar Dados
                  </Link>
                  <button onClick={showDeleteConfirmationPopup}
                    className='flex-1 min-w-[250px] h-14 flex items-center justify-center bg-red-400 text-white rounded-md'>
                    Apagar Conta
                  </button>
                  {showDeleteConfirmation && (
                    <div className="fixed bg-[#000000ab] w-screen h-full top-0 flex items-center justify-center z-40">
                      <div className='bg-white text-[#333] p-10 rounded-md'>
                        <p>Tem certeza de que deseja apagar sua conta?</p>
                        <div className='flex gap-3 pt-5'>
                          <button 
                          onClick={handleDeleteAccount}
                          className='w-full flex-1 h-14 text-white rounded-md bg-red-400'
                          >Sim</button>
                          <button className='w-full flex-1 h-14 text-white  rounded-md bg-gray-400'
                           onClick={closeDeleteConfirmationPopup}>Cancelar</button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Profile;
