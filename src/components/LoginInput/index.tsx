import React, { useState } from 'react'
import styles from './style.module.scss';
import Image from 'next/image';
import passwordEye from '../../assets/passwordEye.svg';


interface IProps {
    setValue : ( value : string ) => void,
    placeholder : string,
    type : string
}

export default function LoginInput( { setValue, placeholder, type } : IProps ) {

    const [ focus, setFocus ] = useState<boolean>(false);
    const [ inputType, setType ] = useState(type);
    const handleOnChange = ( event : React.ChangeEvent<HTMLInputElement> ) => {
      const { value } = event.target;
      setValue(value);
      if(value != '') return setFocus(true);
      setFocus(false);
    }

    const handleChangeType = () =>{
      if(inputType == 'password') return setType('text');
      setType('password');
    }

  return (
    <div className={styles.boxInput} >
        <label className={ !focus ? styles.label : styles.labelFocus }> { placeholder } </label>
        <input 
            onFocus={ () => setFocus(true) }
            className={styles.input}
            onChange={handleOnChange }
            type={inputType} 
        />
        {
          type == 'password' && <Image onClick={handleChangeType} className={styles.ShowPassword} alt={'Password'} src={passwordEye} />
        }
    </div>
  )
}
