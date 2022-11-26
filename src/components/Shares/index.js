import React, { useState } from "react";
import { useFormik  } from 'formik';

import plusIcon from '../../assets/images/plus.svg';
import deleteIcon from '../../assets/images/delete.svg';

const Shares = () => {
    const [ modalOpened, setModalOpened ] = useState(false);
    const [ shares, setShares ] = useState([
        {
            text: '10%',
            imgUrl: `url(./images/share10.png)`,
            id: 0
        },
        {
            text: '50%',
            imgUrl: 'url(./images/share50.png)',
            id: 1
        }
    ]);
    const [ myShares, setMyShares ] = useState([
        {
            text: '10%',
            imgUrl: `url(./images/share10.png)`,
            id: 0
        },
        {
            text: '50%',
            imgUrl: 'url(./images/share50.png)',
            id: 1
        },
        {
            text: '30%',
            imgUrl: 'url(./images/share30.png)',
            id: 2
        }
    ])

    const deleteShare = (index) => {
        setShares(shares.filter((it) => it.id !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        for (let i = 0; i < shares.length; i++) {
            console.log(shares[i].text);    
        }
    }

    const addShare = (it) => {
        let newObj = {
            text: it.text,
            imgUrl: it.imgUrl,
            id: Math.random()
        };
        setShares([...shares, newObj]);
        setModalOpened(false);
    }
    

    return (
        <>
           {modalOpened && <div className="modal">
                <div className="modalWrapper">
                <div className='shareWrapper' style={{marginBottom: '0'}}>
                <img className='deleteShare' src={deleteIcon} alt="delete" onClick={() => setModalOpened(false)}/>
                    {myShares.map((it) => {
                        return( 
                            <div onClick={() => addShare(it)} className='share' style={{background: it.imgUrl, backgroundSize: 'cover', cursor: 'pointer'}} key={it.id} ></div>
                        )
                        
                    })}
                    </div>
                </div>
            </div>}
            <form onSubmit={handleSubmit}>

                <div className='shareWrapper'>
                    {shares.map((it) => {
                        return( 
                            <div className='share' style={{background: it.imgUrl, backgroundSize: 'cover'}} key={it.id} >
                            <img className='deleteShare' src={deleteIcon} alt="delete" onClick={() => deleteShare(it.id)}/>
                            </div>
                        )
                        
                    })}
                        
                <div className='addShare' onClick={() => setModalOpened(true)}>
                    <img src={plusIcon} alt="add share"/>
                </div>
                </div>
    
    
            <button type="submit">Підтвердити</button>
    
            </form>
        </>
        
    )
}

export default Shares;