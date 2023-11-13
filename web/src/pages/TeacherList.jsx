import { useEffect, useState } from "react";
import TeacherItem from "../components/TeacherItem/TeacherItem";
import Header from "../components/header/Header";
import axios from "axios";
import MateriaBd from '../assets/data/materiaDB';
import { Calendar, Clock, Folder } from "phosphor-react";
import SelectField from "../components/inputsField/SelectField";
import dias from '../assets/data/diasSemanais';

const TeacherList = () => {

    const [teachers, setTeachers] = useState([]);
    const Materia = MateriaBd.map((materia) => materia.materia);
    const [materiaSelecionada, setMateriaSelecionada] = useState("Todos"); 
    const [diaSelecionado, setDiaSelecionado] = useState("Todos"); 
    const [horaEntradaSelecionada, setHoraEntradaSelecionada] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8003/teacherlist")
            .then((response) => {
                setTeachers(response.data);
            })
            .catch((error) => {
                console.error("Erro ao obter a lista de professores:", error);
            });
    }, []);

    const filteredTeachers = teachers.filter((teacher) => {
        const materiaLowerCase = (teacher.materiaSelecionada || "").toLowerCase(); 
        const diaLowerCase = (teacher.diasSelecionado || "").toLowerCase(); 

        const matchMateria = materiaSelecionada === "Todos" || materiaLowerCase === materiaSelecionada.toLowerCase();
        const matchDia = diaSelecionado === "Todos" || diaLowerCase === diaSelecionado.toLowerCase();

        const teacherHoraEntrada = teacher.horarioEntrada || ""; 
        const horaEntradaPrimeirosDoisDigitos = teacherHoraEntrada.substring(0, 2); 

        const matchHoraEntrada = horaEntradaSelecionada === null || horaEntradaPrimeirosDoisDigitos === horaEntradaSelecionada;

        return matchMateria && matchDia && matchHoraEntrada;
    });

    return (
        <div className="w-full h-full min-h-screen relative bg-background">
            <Header title="Estes são os professores disponíveis." />
            <div className="p-3">
                <div className="bg-white rounded-md mt-3 flex w-full max-w-4xl p-4 m-auto justify-between gap-5 flex-wrap items-center">
                    <div className="flex-1 min-w-[200px]">
                        <SelectField
                            value={materiaSelecionada}
                            options={Materia}
                            onChange={(option) => setMateriaSelecionada(option)}
                            selecioneText="Selecione a sua matéria"
                            icon={<Folder />}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <SelectField
                            value={diaSelecionado}
                            options={["Todos", ...dias.map(dia => dia.dias)]} // Inclua "Todos" no array de dias
                            onChange={(option) => setDiaSelecionado(option)}
                            selecioneText="Selecione o dia da semana"
                            icon={<Calendar />}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <SelectField
                            value={horaEntradaSelecionada}
                            options={["Todos", "08", "09", "10", "11"]} // Substitua ... com outras horas disponíveis
                            onChange={(option) => setHoraEntradaSelecionada(option)}
                            selecioneText="Selecione a hora de entrada"
                            icon={<Clock />}
                        />
                    </div>
                </div>
                <main className='w-full max-w-4xl flex flex-col gap-10 justify-center h-full pt-10 m-auto'>
                    {filteredTeachers.map((teacher) => (
                        <TeacherItem key={teacher._id} teacher={teacher} />
                    ))}
                </main>
            </div>
        </div>
    )
}

export default TeacherList;
