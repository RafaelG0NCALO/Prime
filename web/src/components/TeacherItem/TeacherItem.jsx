import React from 'react';
import wpplogo from '../../assets/images/Whatsapp.png';

const TeacherItem = ({ teacher }) => {
  const { nome, materiaSelecionada, bio, custo, wpp, link, diasSelecionado, horarioEntrada, horarioSaida } = teacher;

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-10">
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={link} alt="" className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-texttitle text-2xl">{nome}</h1>
            <p className="text-textbase">{materiaSelecionada}</p>
          </div>
        </div>
        <h2 className="text-textbase  py-8 ">{bio}</h2>
        <p className="text-textbase">Disponibilidade: {diasSelecionado}</p>
        <p className="text-textbase">Horário: {horarioEntrada} ás {horarioSaida}</p>
      </div>
      <div className="bg-[#FAFAFC] max-md:flex-col px-10 py-6 border-t-[1px] flex items-center justify-between">
        <div className='flex gap-3 pb-2 items-center text-textbase'>
          Preço/hora
          <span className='text-primary font-semibold text-2xl'>
            R$ {custo}
          </span>
        </div>
        <a href={`https://api.whatsapp.com/send?phone=${wpp}`} target="_blank" rel="noreferrer" className="flex rounded-lg max-md:w-full items-center justify-center gap-3 text-white w-60 h-14 bg-secundary">
          <img src={wpplogo} alt="" />
          Entrar em contato
        </a>
      </div>
    </div>
  );
};

export default TeacherItem;
