import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
// componens
import Input from "@/components/Input";
// icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";



const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('Sign In');

    // สลับหน้า SignUp และ SignIn
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'Sign In' ? 'Sign Up' : 'Sign In');
    }, []);

    // API SignIn
    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles'
            });
        } catch (error) {
            console.log(error);
        }
    }, [email, password]);

    // API SigUp
    const signUp = useCallback(async () => {
        try {
            await axios.post('/api/signUp', {
                email,
                name,
                password
            });
            login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);



    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'Sign In' ? 'Sign In' : 'Sign Up'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'Sign Up' && (
                                <Input
                                    id="name"
                                    label="Username"
                                    value={name}
                                    onChange={(ev: any) => setName(ev.target.value)}
                                />
                            )}
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(ev: any) => setEmail(ev.target.value)}
                            />
                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(ev: any) => setPassword(ev.target.value)}
                            />
                        </div>
                        <button onClick={variant === 'Sign In' ? login : signUp} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'Sign In' ? 'Sign In' : 'Sign Up'}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                ">
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: '/' })}
                                className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                ">
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'Sign In' ? 'New to Netflix?' : 'Already registered? Please'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'Sign In' ? 'Sign up now.' : 'Sign In'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;