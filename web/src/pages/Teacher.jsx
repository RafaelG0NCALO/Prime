import TeacherForm from '../components/forms/TeacherForm.jsx'
import Header from '../components/header/Header.jsx'
import professor from '../assets/images/professor.png';

const Teacher = () => {

  return (
    <div className="w-full h-full min-h-screen relative bg-background">

        <Header img={professor} title='Que incrível que você quer dar aulas.' text='O primeiro passo, é preencher esse formulário de inscrição.'/>


        <div className='w-full flex items-center justify-center px-4'>
            <div className='-translate-y-14 p-6 rounded-2xl w-full max-w-4xl m-auto bg-white h-full min-h-screen'>
                <TeacherForm/>
                
            </div>
        </div>
       
    </div>
  )
}

export default Teacher