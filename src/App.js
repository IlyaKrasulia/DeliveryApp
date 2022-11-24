import React, { useState } from 'react';
import { useFormik  } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

import './App.css';
import Tab from './components/Tab';

import plusIcon from './assets/images/plus.svg';
import deleteIcon from './assets/images/delete.svg';

function App() {

  const [ activeTab, setActiveTab ] = useState(0);
  const [ timeDeliveryCheckbox, setTimeDeliveryCheckbox ] = useState(false);


  const changeTabActive = (index) => {
    index === activeTab ? setActiveTab(0) : setActiveTab(index);
  }

  const validateTimeDelivery  = useFormik({
    initialValues: {
      startTime: '',
      endTime: '',
      interval: '',
    },
    validationSchema: Yup.object().shape({
      startTime: Yup.string()
        .min(4, 'Too Short!')
        .max(6, 'Too Long!')
        .required('Required'),
  
        endTime: Yup.string()
        .min(4, 'Too Short!')
        .max(6, 'Too Long!')
        .required('Required'),
  
        interval: Yup.string()
        .min(2, 'Too Short!')
        .max(5, 'Too Long!')
        .required('Required')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  
  return (
    <div className="App">
      <div className='tabWrapper'>
        <Tab 
          title={"Час самовивозу"} 
          handleClick={() => changeTabActive(1)} 
          opened={activeTab===1 ? true : false}
        />
       {activeTab===1 && 
          <form onSubmit={validateTimeDelivery.handleSubmit}>
          <div className='startEnd'>
            <div className='input'>
              <label className='inputLabel' htmlFor='startTime'>Початок</label>
              <InputMask 
                className='timeInput'
                placeholder='00:00'
                id='startTime'
                name='startTime'
                value={validateTimeDelivery.values.startTime}
                onChange={validateTimeDelivery.handleChange}
                disabled={timeDeliveryCheckbox ? true : false}
                mask="12:32"
                formatChars={{
                  '1': '[0-2]',
                  '2': '[0-9]',
                  '3': '[0-5]',
                }}
              /> 
              {validateTimeDelivery.touched.startTime && validateTimeDelivery.errors.startTime ? (
              <div>{validateTimeDelivery.errors.startTime}</div>
              ) : null}
 
            </div>
            <div className='input'>
              <label className='inputLabel' htmlFor='endTime'>Кінець</label>
              <InputMask 
                className='timeInput'
                placeholder='00:00'
                id='endTime'
                name='endTime'
                value={validateTimeDelivery.values.endTime}
                onChange={validateTimeDelivery.handleChange}
                disabled={timeDeliveryCheckbox ? true : false}
                mask="12:32"
                formatChars={{
                  '1': '[0-2]',
                  '2': '[0-9]',
                  '3': '[0-5]',
                }}
              />
            </div> 
          </div>  

        
          <div className='checkbox' onClick={() => setTimeDeliveryCheckbox(!timeDeliveryCheckbox)}>
          <input type="checkbox" id="checkbox-1"/>
          <label htmlFor="checkbox-1">цілодобово</label>
          </div>

          <div className='interval'>
          <label htmlFor='intervalInput'>Укажіть інтервал самовивозу</label>
          <InputMask
            className='intervalInput' 
            placeholder='00 хв'
            id='intervalInput'
            name='interval'
            value={validateTimeDelivery.values.interval}
            onChange={validateTimeDelivery.handleChange}
            mask="12хв"
            formatChars={{
              '1': '[0-5]',
              '2': '[0-9]'
            }}
            />
          </div>

          <button type="submit">Підтвердити</button>

          </form>
       }
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Час доставки"} 
          handleClick={() => changeTabActive(2)}
          opened={activeTab===2 ? true : false}
        />
        {activeTab===2 && 
        <form>

        <div className='startEnd'>
          <div className='input'>
            <label className='inputLabel' htmlFor='startTime'>Початок</label>
            <input 
              className='timeInput'
              placeholder='00:00'
              id='startTime'
            /> 
          </div>
          <div className='input'>
            <label className='inputLabel' htmlFor='endTime'>Кінець</label>
            <input 
              className='timeInput'
              placeholder='00:00'
              id='endTime'
            />
          </div> 
        </div>  

        <div className='checkbox'>
        <input type="checkbox" id="checkbox-1"/>
        <label htmlFor="checkbox-1">цілодобово</label>
        </div>

        <div className='interval'>
        <label htmlFor='intervalInput'>Укажіть інтервал самовивозу</label>
        <input
          className='intervalInput' 
          placeholder='00 хв'
          id='intervalInput'
          />
        </div>

        <button>Підтвердити</button>

        </form>}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Вартість доставки"} 
          handleClick={() => changeTabActive(3)}
          opened={activeTab===3 ? true : false}
        />
        {activeTab===3 && <form>
          <div className='input'>
              <label className='inputLabel' htmlFor='deliveryPrice'>Вартість доставки</label>
              <input 
                className='priceInput'
                placeholder='0 грн'
                id='deliveryPrice'
                type="time"
              /> 
          </div>

          <div className='input'>
              <label className='inputLabel' htmlFor='deliveryPrice'>Сума замовлення, від якої <br/> доставка безкоштовна</label>
              <input 
                className='priceInput'
                placeholder='0 грн'
                id='deliveryPrice'
              /> 
          </div>
          <button>Підтвердити</button>
        </form>}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Акційні пропозиції"} 
          handleClick={() => changeTabActive(4)}
          opened={activeTab===4 ? true : false}
        />
        {activeTab===4 && <form>

          <div className='shareWrapper'>
            <div className='share'>
              <img className='deleteShare' src={deleteIcon} alt="delete"/>
            </div>
            <button className='addShare'>
              <img src={plusIcon} alt="add share"/>
            </button>
          </div>


        <button>Підтвердити</button>

</form>}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Вимкнути додаток"} 
          inline={{color: "#F80F39"}} 
          handleClick={() => changeTabActive(5)}
          opened={activeTab===5 ? true : false}
        />
        {activeTab===5 && <form>

          <div className='input'>
              <label className='inputLabel' htmlFor='reasonShutdown'>Напишіть повідомлення (причину вимкнення)</label>
              <input 
                className='reasonShutdown'
                placeholder='текст'
                id='reasonShutdown'
              /> 
            </div>

        <button>Підтвердити</button>

        </form>}
      </div>
    </div>
  );
}

export default App;
