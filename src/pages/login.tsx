import React, { FormEvent, useState, useEffect } from 'react'
import cookie from 'js-cookie'
import styles from '../styles/login.module.scss';
import LoginInput from '@/components/LoginInput';
import ErrorBox from '@/components/error/ErrorBox';
import apiFetch from '@/utils/axios';
import { useRouter } from 'next/router';
import loginImage from '../assets/loginImage.svg'
import Image from 'next/image'


export default function Login( ) {
    const router = useRouter();
    const getError = () =>  router.query.error?.toString().replaceAll('-', ' ') || '';
    const [ email, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ showError, setError ] = useState<boolean>(true);
    
    const handleLogin = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await apiFetch.post('/auth/login', { email, password });
            const jwt = response.data.access_token;
            if(!jwt) throw new Error('Access Token not provided');
            cookie.set('jwt', jwt);
            cookie.set('email', email);
            router.push('/products?page=1&limit=5');
        } catch (error : any ) {
            console.error(error);
            router.push('/login?error=Erro no login. Verifique usuario e senha')
        }
    }

  return (
    <>
        <main>
            <div className={styles.Login} >
                <div className={styles.LoginImage} >
                    <Image className={styles.LoginImage}  src={loginImage} alt="login image"  />
                </div>
                <div className={styles.line}></div>
                <form className={styles.LoginForm} onSubmit={handleLogin}>
                    <h1>
                        Log In
                    </h1>
                    <LoginInput placeholder='Username' setValue={ (value : string) => setUsername(value)} type='text' />
                    <LoginInput placeholder='Password' setValue={ (value : string ) => setPassword(value)} type='password' />
                    <button> Log In </button>
                    <div className={styles.errorWrapper}>
                       { (getError() != '' && showError ) && <ErrorBox error={getError()} cleanError={() => setError(false)} />}
                    </div>
                </form>
            </div>    
        </main>
    </>
  )
}
