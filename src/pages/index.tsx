import { tokenHasExpired } from '@/utils/cookieUtils';
import { Inter } from '@next/font/google'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const router = useRouter();
  router.push('/products?page=1&limit=5', undefined, { shallow: false })
  return (
    <>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async (context) =>{
  try {
    const { req, res } = context;
    const { jwt } = req.cookies;
    if(!jwt) {
      res.writeHead(302,{ Location: '/login?error=Login-requerido-para-acesso'});
      res.end();
      throw new Error('User authentication failed');
    }else if(tokenHasExpired(jwt)){
      res.writeHead(302,{ Location: '/login?error=Token-de-acesso-expirado' });
      res.end();
      throw new Error('User authentication failed');
    }
    return{ 
      props: {}
    }
  } catch (error) {
    console.error(error);
    return{ 
      props: {}
    }
  }
}
