import { ArrowLeft } from 'phosphor-react';
import { Link, useLocation } from "react-router-dom";
import minilogo from '../../assets/images/Prime.png';


const Header = (props) => {
    const location = useLocation();
    return (
        <div className='w-full bg-primary relative h-full min-h-[32vh] px-4  pb-20'>
            <header className="flex py-4 justify-between items-center w-full max-w-7xl m-auto">
                <Link to={props.location || '/'}>
                    <ArrowLeft size={36} className='text-white rounded-full hover:bg-primarylight cursor-pointer transition-all bg-primarylighter p-2' />
                </Link>
                <img src={minilogo} alt="" className='object-contain h-12' />
            </header>
            <div className='w-full max-w-4xl m-auto max-sm:flex-col-reverse max-sm:justify-center flex justify-between items-center'>
            <div className='w-full text-left '>
                <h1 className='text-white w-full max-w-xs font-semibold text-3xl py-3'>
                    {props.title}
                </h1>
                <p className='text-textinprimary w-full max-w-xs font-sans text-lg'>
                {props.text}
                </p>
            </div>
            <img src={props.img} alt="" className='w-52 max-sm:w-full' />
            {props.children}
            </div>
        </div>
    )
}

export default Header