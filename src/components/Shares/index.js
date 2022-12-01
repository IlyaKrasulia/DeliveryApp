import React, { useState, useRef, useEffect } from "react";

import plusIcon from '../../assets/images/plus.svg';
import deleteIcon from '../../assets/images/delete.svg';

const Shares = () => {
    const ref = useRef();
    const [ image, setImage ] = useState();
    const [ imageUrl, setImageUrl ] = useState();
    const [ shares, setShares ] = useState([

    ]);

    const deleteShare = (index) => {
        setShares(shares.filter((it) => it.id !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        shares.length >=1 ? console.log(shares) : console.log('error');
    }

    const addShare = () => {
        let newObj = {
            imgUrl: imageUrl,
            id: Math.random()
        }
        setShares([newObj])
    }
    const fileReader = new FileReader();
    const uploadImg = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage(file);
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {         
        let newObj = {
            imgUrl: fileReader.result,
            id: Math.random()
        }
        setShares([...shares, newObj])
        } 
        
    }

    const refInput = () => {
        ref.current.click();
    }

    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='shareWrapper'>
                    {shares.map((it) => {
                        return( 
                            <div className='share' style={{background: `url(${it.imgUrl})`, backgroundSize: 'cover'}} key={it.id} >
                            <img className='deleteShare' src={deleteIcon} alt="delete" onClick={() => deleteShare(it.id)}/>
                            </div>
                        )
                        
                    })}
                        
                <div className='addShare' onClick={() => refInput()}>
                    <img src={plusIcon} alt="add share"/>
                </div>
                <input ref={ref} className="uploadImg" type='file' accept="image/*,.png,.jpg" onChange={e => uploadImg(e)}/>
                </div>
    
    
            <button type="submit">Підтвердити</button>
    
            </form>
        </>
        
    )
}

export default Shares;