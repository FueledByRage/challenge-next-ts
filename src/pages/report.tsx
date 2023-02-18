import { fetchProducts, fetchReport, IReport } from '@/utils/fetchData';
import { GetServerSideProps } from 'next';
import React from 'react'
import styles from '../styles/relatorio.module.scss';
import { generatePDF } from '@/utils/generatePDF';
import { tokenHasExpired } from '@/utils/cookieUtils';

interface IProps{
  data : IReport
}

export default function Report({ data } : IProps) {

  return (
    <>
        <main>
          <div className={styles.ReportContainer} >
            <h1>Relatorio</h1>
            <div className={styles.ReportData} >
              <div> Custo total dos produtos </div>
              <div> { data.totalCost } </div>
            </div> 
            <div className={styles.ReportData} >
              <div> Quantidade total de produtos </div>
              <div> { data.totalQuantity } </div>
            </div>
            <button onClick={ e => generatePDF(data.totalCost.toString(), data.totalQuantity.toString())} >
              Gerar Relatorio
            </button>
          </div>
        </main>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async (context) =>{
    try {
      const { req, res } = context;
      const { jwt, email } = req.cookies;
      if(!jwt) {
        res.writeHead(302,{ Location: '/login?error=Login-requerido-para-acesso'});
        res.end();
        throw new Error('User authentication failed');
      }else if(tokenHasExpired(jwt)){
        res.writeHead(302,{ Location: '/login?error=Token-de-acesso-expirado' });
        res.end();
        throw new Error('User authentication failed');
      }
      if(!email || email != 'nilson@email.com') {
        res.writeHead(302,{ Location: '/products' }) 
        res.end();
        throw new Error('Você não possui autorização para entrar nessa pagina.');
      }
  
      const response = await fetchReport( jwt );
  
      const data = JSON.parse(JSON.stringify({ response }))
  
      return{ props: {
        data : data.response
      }}
    } catch (error) {
      return{
        props: {
          error
        }
      }
    }
  }
  