import React, { useState } from 'react'
import InputField from '../inputsField/inputField'
import { AddressBook, At, Calendar, Clock, CurrencyDollar, Folder, Link, PictureInPicture, Shield, User, Warning, WarningCircle, WhatsappLogo } from 'phosphor-react'
import TextAreaField from '../inputsField/TextAreaField'
import SelectField from '../inputsField/SelectField'
import MateriaBd from '../../assets/data/materiaDB'
import DiasSemanaisBd from '../../assets/data/diasSemanais'

const TeacherForm = () => {

  const Materia = MateriaBd.map((materia) => materia.materia);
  const [materiaSelecionada, setMateriaSelecionada] = useState("");
  const [erro, setErro] = useState("");
  const [clearSelectField, setClearSelectField] = useState(false);


  const diasSemanais = DiasSemanaisBd.map((dias) => dias.dias);
  const [diasSelecionado, setDiasSelecionado] = useState("")

  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");
  const [wpp, setWpp] = useState("");
  const [bio, setBio] = useState("");
  const [custo, setCusto] = useState("");
  const [bioCharactersCount, setBioCharactersCount] = useState(0);
  const [horarioEntrada, setHorarioEntrada] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");
  const [password, setPassword] = useState("")

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value)
  }
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleChangeNome = (event) => {
    const value = event.target.value;
    setNome(value);
  };
  const isNomeValid = nome.length >= 8 && /^[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\uFB00-\uFB06\s]+$/.test(nome);

  const handleChangeLink = (event) => {
    const value = event.target.value;
    setLink(value);
  }
  const isLinkValid = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})(\/[^\s]*)?$/.test(link);

  const handleChangeWpp = (event) => {
    const value = event.target.value;
    setWpp(value)
  }
  const isWppValid = wpp.length >= 8 && /^[0-9]+$/.test(wpp)

  const handleChangeBio = (event) => {
    const value = event.target.value;
    setBio(value)
    setBioCharactersCount(value.length);
  }
  const isBioValid = bio.length > 300

  const handleChangeCusto = (event) => {
    const value = event.target.value;
    setCusto(value)
  }
  const isCustoValid = custo.length > 0 && /^[0-9,]+$/.test(custo);

  const handleChangeHorarioSaida = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d)/, "$1:$2");
    }
    const hour = value.slice(0, 2);
    const minute = value.slice(3, 5);
    if (hour !== "" && Number(hour) > 23) {
      value = "23:" + minute;
    }
    if (minute !== "" && Number(minute) > 59) {
      value = hour + ":59";
    }
    setHorarioSaida(value);
  };
  const isHorarioSaidaValid = horarioSaida.length >= 5;

  const handleChangeHorarioEntrada = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d)/, "$1:$2");
    }
    const hour = value.slice(0, 2);
    const minute = value.slice(3, 5);
    if (hour !== "" && Number(hour) > 23) {
      value = "23:" + minute;
    }
    if (minute !== "" && Number(minute) > 59) {
      value = hour + ":59";
    }
    setHorarioEntrada(value);
  };
  const isHorarioEntradaValid = horarioEntrada.length >= 5;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isNomeValid | !nome | !email | !isEmailValid | !password | !isPasswordValid | !link | !isLinkValid | !isWppValid | !wpp | !bio | isBioValid | !materiaSelecionada | !isCustoValid | !custo | !diasSelecionado | !isHorarioSaidaValid | !isHorarioEntradaValid | !horarioEntrada | !horarioSaida) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    const data = {
      email,
      password,
      nome,
      link,
      wpp,
      bio,
      materiaSelecionada,
      custo,
      diasSelecionado,
      horarioEntrada,
      horarioSaida
    };
    console.log("Dados do formulário:", data);

    setErro("");
    setEmail("");
    setPassword("");
    setNome("");
    setLink("");
    setWpp("");
    setBio("");
    setMateriaSelecionada("");
    setCusto("");
    setDiasSelecionado("");
    setHorarioEntrada("");
    setHorarioSaida("");
    setClearSelectField(true);
  };

  const addindata = async (e) => {

    const res = await fetch("http://localhost:8003/teacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        nome,
        link,
        wpp,
        bio,
        materiaSelecionada,
        custo,
        diasSelecionado,
        horarioEntrada,
        horarioSaida
      })
    })
    const data = await res.json();
    console.log(data)

    if(res.status === 404 || !data){
      alert("Error");
      console.log("error")
    }else{
      alert("data added")
      console.log("data added")
    }

  }

  return (
    <form className='' onSubmit={handleSubmit}>
      <h1 className='text-2xl font-black text-texttitle pb-3 border-b-[1px] mb-7'>Seus dados</h1>
      <p className="w-full text-center text-red-600">{erro}</p>
      <InputField
        Valid={isEmailValid}
        borderValue={!!email}
        onChange={handleChangeEmail}
        value={email}
        validMsg={email ? !isEmailValid : false}
        icon={<At />}
        label="E-mail"
        ErroName="E-mail inválido"
        placeholder="Ex: Rafael@Gmail.com"
      />
      <InputField
        Valid={isPasswordValid}
        borderValue={!!password}
        onChange={handleChangePassword}
        value={password}
        validMsg={password ? !isPasswordValid : false}
        icon={<Shield />}
        label="Senha"
        ErroName="coloque elementos diversos min: 8"
        placeholder="Ex: Rafael@Gmail.com"
        type="password"
        eye
      />
      <InputField
        Valid={isNomeValid}
        borderValue={!!nome}
        onChange={handleChangeNome}
        value={nome}
        validMsg={nome ? !isNomeValid : false}
        icon={<User />}
        label="Nome completo"
        ErroName="Nome inválido"
        placeholder="Ex: Rafael Gonçalo"
      />

      <InputField
        valid={isLinkValid}
        onChange={handleChangeLink}
        value={link}
        validMsg={link ? !isLinkValid : false}
        icon={<PictureInPicture />}
        label="Link da sua foto"
        ErroName="Link inválido"
        placeholder="(comece com //http)"
        borderValue={!isLinkValid && !!link}
      />

      <InputField
        valid={isWppValid}
        onChange={handleChangeWpp}
        value={wpp}
        validMsg={wpp ? !isWppValid : false}
        icon={<WhatsappLogo />}
        label="Coloque seu whatsapp"
        ErroName="Número inválido"
        placeholder="Ex: 98883333"
        borderValue={!isWppValid && !!wpp}
      />

      <TextAreaField
        valid={!isBioValid}
        onChange={handleChangeBio}
        value={bio}
        validMsg={bio ? isBioValid : false}
        ErroName="Diminua a mensagem"
        borderValue={isBioValid && !!bio}
        label='Biografia'
        placeholder='Biografia'
        icon={<AddressBook />}
        CharactersCount={bioCharactersCount} />

      <h1 className='text-2xl font-black text-texttitle pb-3 border-b-[1px] mb-6'>Sobre a aula</h1>
      <SelectField
        label='Matéria'
        value={materiaSelecionada}
        error={!materiaSelecionada && !!erro}
        options={Materia}
        onChange={(option) => setMateriaSelecionada(option)}
        selecioneText="Selecione a sua matéria"
        icon={<Folder />}
        clear={clearSelectField}
      />

      <InputField
        Valid={isCustoValid}
        borderValue={!!custo}
        onChange={handleChangeCusto}
        value={custo}
        validMsg={custo ? !isCustoValid : false}
        icon={<CurrencyDollar />}
        label='Custo (em R$)'
        ErroName="custo inválido"
        placeholder='Exemplo 30,50'
      />

      <h1 className='text-2xl font-black text-texttitle pb-3 border-b-[1px] mb-7'>Horários disponíveis</h1>

      <SelectField
        label='Dia da semana'
        value={diasSelecionado}
        error={!diasSelecionado && !!erro}
        options={diasSemanais}
        onChange={(option) => setDiasSelecionado(option)}
        selecioneText="Dias da semana"
        icon={<Calendar />}
        clear={clearSelectField}
      />

      <InputField
        Valid={isHorarioEntradaValid}
        borderValue={!!horarioEntrada}
        onChange={handleChangeHorarioEntrada}
        value={horarioEntrada}
        validMsg={horarioEntrada ? !isHorarioEntradaValid : false}
        icon={<Clock />}
        label="De 00:00"
        ErroName="Inválido"
        placeholder="Ex: 09:00"
      />

      <InputField
        Valid={isHorarioSaidaValid}
        borderValue={!!horarioSaida}
        onChange={handleChangeHorarioSaida}
        value={horarioSaida}
        validMsg={horarioSaida ? !isHorarioSaidaValid : false}
        icon={<Clock />}
        label="Ate 00:00"
        ErroName="Inválido"
        placeholder="Ex: 18:00"
      />

      <div className='p-10 max-md:p-2 border-t-2 border-gray-300 flex justify-between'>

        <div className='flex max-md:text-sm max-md:gap-2 items-center text-gray-400 gap-6'>
          <WarningCircle size={34} />
          <div className='flex flex-col items-start'>
            <div>Importante!</div>
            <div>Preencha todos os dados</div>
          </div>
        </div>

        <button onClick={addindata} className='w-72 text-white hover:bg-secundarydark transition-all max-md:w-full h-16 text-2xl  rounded-lg flex items-center justify-center gap-4 bg-secundary'>
          Salvar
        </button>

      </div>

    </form>
  )
}

export default TeacherForm