import React, { useState } from 'react'
import styles from './style.module.scss';

interface IProps{
    lastPage: boolean,
    page:  number,
    updatePage : ( newPage : number ) => void
}

export default function Pages( { lastPage, page, updatePage } : IProps ) {

  return (
    <div className={styles.Pages} >
        {
            <div onClick={ event => updatePage(page - 1) }  className={styles.Page} >
                {
                    page >1 && page - 1
                }
            </div>
        }
        <div className={styles.Page} > { page } </div>
        {
            !lastPage &&
            <div onClick={e => updatePage(page + 1)} className={styles.Page} > { page + 1 } </div>
        }
    </div> 
  )
}
