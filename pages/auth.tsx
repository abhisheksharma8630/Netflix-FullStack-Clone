import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = ()=>{
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [variant,setVariant] = useState('login');

    const toggleVariant = useCallback(()=>{
        setVariant((variant)=> variant==='login' ? 'register': 'login'); 
    },[variant]);

    const login = useCallback(async () => {
        try {
            await signIn('credentials',{
                email,
                password,
                redirect:false,
                callbackUrl:'/'
            });
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    },[email,password,router]);

    const register = useCallback(async ()=>{
        try {
            await axios.post('/api/register',{email,name,password});
            login();
        } catch (error) {
            console.log(error)
        }
    },[email,name,password,login]);
    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo_image" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white font-semibold text-4xl mb-8">{variant === 'login' ? 'Sign in' : 'Register'}</h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                            <Input label="Username" id="name" onChange={(ev:any)=>setName(ev.target.value)} type="text" value={name}/> )}
                            <Input label="Email" id="email" onChange={(ev:any)=>setEmail(ev.target.value)} type="email" value={email}/>
                            <Input label="Password" id="password" onChange={(ev:any)=>setPassword(ev.target.value)} type="password" value={password}/>
                        </div>
                        <button onClick={variant=== 'login' ? login : register} className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md mt-10 py-3 transition" >
                            {variant=== 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={()=>{signIn('github',{callbackUrl:'/'})}} className="bg-white h-10 w-10 rounded-full flex justify-center items-center text-3xl cursor-pointer hover:opacity-80 transition">
                                <FaGithub/>
                            </div>
                            <div onClick={()=>{signIn('google',{callbackUrl:'/'})}} className="bg-white h-10 w-10 rounded-full flex justify-center items-center text-3xl cursor-pointer hover:opacity-80 transition">
                                <FcGoogle/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant==='login'? 'First time using netflix?': 'Already have an account? '}
                            <span onClick={toggleVariant} className="text-white hover:underline cursor-pointer ml-1">
                                {variant ==='login' ? 'Create an Account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;