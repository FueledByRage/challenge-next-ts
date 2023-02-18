import React from 'react'
import styles from './style.module.scss';

interface IProps{
    error: string,
    cleanError?: () => void
}

export default function ErrorBox( { error, cleanError } : IProps ) {
  return (
    <div className={styles.errorBox} >
        { cleanError && <small onClick={ cleanError } >X</small>}
        { error }
    </div>
  )
}
