import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import InputField from '../components/inputsField/inputField'
import { AddressBook, Clock, CurrencyDollar, Folder, Pen, User, WhatsappLogo } from "phosphor-react";
import TextAreaField from "../components/inputsField/TextAreaField";
import SelectField from "../components/inputsField/SelectField";

const Edit = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    bio: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [bioCharactersCount, setBioCharactersCount] = useState(0);
  const Materia = ["Matéria 1", "Matéria 2", "Matéria 3"];
  const Dias = ["Seg", "Terça", "Quarta"];
  const [validMsg, setValidMsg] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:8003/profile/${id}`)
      .then(response => {
        setUser(response.data);
        setFormData(response.data);
        setBioCharactersCount(response.data.bio.length);
      })
      .catch(error => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "horarioEntrada" || name === "horarioSaida") {
      let newValue = value.replace(/\D/g, "");
      newValue = newValue.substring(0, 4);
      if (newValue.length > 2) {
        newValue = newValue.replace(/(\d{2})(\d)/, "$1:$2");
      }
      const hour = newValue.slice(0, 2);
      const minute = newValue.slice(3, 5);
      if (hour !== "" && Number(hour) > 23) {
        newValue = "23:" + minute;
      }
      if (minute !== "" && Number(minute) > 59) {
        newValue = hour + ":59";
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  

  const handleBioChange = (e) => {
    const bioText = e.target.value;
    if (bioText.length <= 300) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bio: bioText,
      }));
      setBioCharactersCount(bioText.length);
    } else {
      const errorMessage = "Limite excedido (Máximo: 300 caracteres)";
      setValidMsg(errorMessage);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8003/profile/${id}/edit`, formData);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  };



  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center bg-primary p-5">
      <div className='absolute top-0 left-0 w-full h-16 overflow-hidden'>
        <Header location={`/profile/${id}`} />
      </div>
      {user ? (
        <>
          <div className='w-full max-w-2xl m-auto'>
            <h1 className='text-white text-3xl font-semibold flex gap-3 pb-3'>
              Editar Perfil<Pen size={32} />
            </h1>
            <div className='w-full bg-white p-5 rounded-md'>

              <div className="flex gap-3 -mb-10 ">
                <InputField
                  type="text"
                  name="nome"
                  icon={<User />}
                  label="Nome completo"
                  placeholder="Ex: Rafael Gonçalo"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  name="email"
                  icon={<User />}
                  label="E-mail"
                  placeholder="Ex: Rafael@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3 -mb-5">
                <InputField
                  type="text"
                  name="wpp"
                  icon={<WhatsappLogo />}
                  label="Whatsapp"
                  placeholder="Ex: 9999-9999"
                  value={formData.wpp}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  name="custo"
                  icon={<CurrencyDollar />}
                  label="Preço/Hora"
                  placeholder="Ex: 30,00"
                  value={formData.custo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3 -mb-2">
                <SelectField
                  label='Matéria'
                  name='materiaSelecionada'
                  value={formData.materiaSelecionada}
                  options={Materia}
                  onChange={(value) => handleSelectChange("materiaSelecionada", value)}
                  selecioneText="Selecione a sua matéria"
                  icon={<Folder />}
                />

                <SelectField
                  label='Dia(s) da semana'
                  name='diasSelecionado'
                  value={formData.diasSelecionado}
                  options={Dias}
                  onChange={(value) => handleSelectChange("diasSelecionado", value)}
                  selecioneText="Selecione o(s) dia(s)"
                  icon={<Folder />}
                />
              </div>

              <div className="flex gap-3 -mb-5">
                <InputField
                  type="text"
                  name="horarioEntrada"
                  icon={<Clock />}
                  label="Horário de Início"
                  placeholder="11:00"
                  value={formData.horarioEntrada}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  name="horarioSaida"
                  icon={<Clock />}
                  label="Horário do Término"
                  placeholder="11:00"
                  value={formData.horarioSaida}
                  onChange={handleInputChange}
                />
              </div>

              <TextAreaField
                name="bio"
                value={formData.bio}
                onChange={handleBioChange}
                label="Biografia"
                placeholder="Biografia"
                icon={<AddressBook />}
                CharactersCount={bioCharactersCount}
                validMsg={validMsg}
                ErroName={validMsg}
              />

              <button className="w-full h-14 bg-primarylighter text-white text-xl rounded-md" onClick={handleSave}>
                Salvar
              </button>

            </div>
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Edit;
