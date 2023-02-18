import ErrorBox from '@/components/error/ErrorBox';
import Pages from '@/components/pagination/Pages';
import { DTOProduct } from '@/dtos/DTOProduct';
import { tokenHasExpired } from '@/utils/cookieUtils';
import { fetchProducts } from '@/utils/fetchData';
import { sortData } from '@/utils/sortData';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from '../styles/products.module.scss';

interface IProps{
  data : DTOProduct[],
  error: Error
}

interface ISort{
  key : string,
  asc : boolean
}

export interface IPageContext{
  page: number,
  limit: number
}

export default function Products({ data } : IProps ) {


  const [ sort, setSort ] = useState<ISort>({ key: 'id', asc : true });
  const router = useRouter()
  const [ products, setProducts ] = useState(data);
  const { page, limit } = router.query;
  const productKeys = ['id', 'name', 'cost', 'quantity', 'location', 'family']

  const changeSortState = ( key : string) =>{
    const asc = sort.key != key ? true : !sort.asc
    setProducts(sortData(data, key as keyof DTOProduct, asc))
    
    setSort({ key, asc });
  }
  const getProducts = () =>{
    const pageLimit = Number(limit || 5);
    const currentPage = Number(page || 1);
    const sliceStart = (currentPage * 5) - 5;
    const sliceEnd = currentPage * 5;
    return products.slice( sliceStart, sliceEnd )
  }

  return (
    <>
        <main>
            {
            products ? 
            <table className={ styles.Table } >
                {
                  productKeys.map( key => <th key={key} onClick={ e => changeSortState(key) } className={ sort.key == key ? styles.SelectedCell : styles.CellHead } >
                    <div className={styles.row}>
                      { key }  
                      <div>
                        {
                          sort.key == key &&
                          <div className={ sort.asc ? styles.triangle : styles.descTriangle}>
                          </div>
                        }
                      </div>
                    </div> 
                  </th>)}
                <tbody>
                  {
                    getProducts().map( product =>{
                      return <tr key={product.id} >
                                <th className={styles.Cell} >{product.id} </th>
                                <th className={styles.Cell} >{product.name} </th>
                                <th className={styles.Cell} >{product.cost} </th>
                                <th className={styles.Cell} >{product.quantity} </th>
                                <th className={styles.Cell} >{product.location} </th>
                                <th className={styles.Cell} >{product.family} </th>
                        </tr>
                    })
                  }
                </tbody>
              </table>
              : <ErrorBox error={'Erro na busca de registros'}  />
            }
            {
            products && <div className={styles.SelectorRow}>
              <div></div>
              <Pages lastPage={ Number(page) * 5 >= Number(limit) } page={Number(page)|| 1} updatePage={ ( newPage : number ) => router.push(`/products?page=${newPage}&limit=${limit || 5}`, `/products?page=${newPage}&limit=${limit || 5}`, { shallow: false })} />
              <select onChange={event => router.push(`/products?page=${page || 1}&limit=${event.target.value}`, `/products?page=${page || 1}&limit=${event.target.value}`, { shallow: false }  )} name="" id="">
                <option value={5}>5</option>
                <option value={10}>10</option>
                {/*<option value={15}>15</option>
                <option value={20}>20</option>*/}
              </select>
            </div>}
        </main>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async (context) =>{
  try {
    const { req, res } = context;
    const { query } = context; 
    const { jwt } = req.cookies;
    if(!jwt) {
      res.writeHead(302,{ Location: '/login?error=Login-requerido-para-acesso'});
      res.end();
      throw new Error('User authentication failed');
    }else if(tokenHasExpired(jwt)){
      res.writeHead(302,{ Location: '/login?error=Token-de-acesso-expirado' });
      res.end();
      throw new Error('User token expired');
    }
    const response = await fetchProducts( query.page?.toString() || '1', query.limit?.toString() || '5', jwt );
    console.log(response)
    const data = JSON.parse(JSON.stringify({ response }))
    return{ props: {
      data : data.response
    }}
  } catch (error) {
    console.error(error);
    return{
      props: {}
    }
  }
}
