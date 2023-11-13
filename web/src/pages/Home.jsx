import intro from '../assets/images/intro.png'
import ilustra from '../assets/images/Ilustra.png'
import { BookOpen, Presentation, SignIn } from 'phosphor-react'
import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div className="w-full min-h-screen h-full flex items-center justify-center bg-primary p-5">
            <div className="w-full max-w-7xl m-auto">

                <div className='w-full flex justify-end'>
                    <Link to='/login' 
                    className='w-24 hover:bg-primarydark transition-all h-10 text-lg rounded-lg flex items-center justify-center gap-2 bg-primarylighter text-white' >
                        <SignIn size={25} /> Entrar 
                    </Link>
                </div>
              
                <div className='flex w-full justify-center flex-wrap py-20 gap-10'>
                    <div className="flex-1 min-w-[300px]">
                        <img src={intro} alt="" className='object-fill w-[85%]' />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                        <img src={ilustra} alt="" />
                    </div>
                </div>

                <div className='flex max-md:flex-wrap items-center gap-4  text-white'>
                    <Link to='/teacherlist' className='w-72 hover:bg-primarylight transition-all max-md:w-full h-24 text-2xl  rounded-lg flex items-center justify-center gap-4 bg-primarylighter'>
                        <BookOpen size={32} />Estudar
                    </Link>
                    <Link to='/teacher' className='w-72 hover:bg-secundarydark transition-all max-md:w-full h-24 text-2xl  rounded-lg flex items-center justify-center gap-4 bg-secundary'>
                        <Presentation size={32} />Dar aulas
                    </Link>
                </div>
               
            </div>

        </div>
    )
}

export default Home