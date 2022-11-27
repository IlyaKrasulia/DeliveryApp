import React, { useState, useEffect } from 'react';
import { Formik, useFormik  } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

import './App.css';
import Tab from './components/Tab';

import Shares from './components/Shares';

function App() {
  const [ activeTab, setActiveTab ] = useState(0);
  const [ timeDeliveryCheckbox, setTimeDeliveryCheckbox ] = useState(false);
  const [ timePickupCheckbox, setTimePickupCheckbox ] = useState(false);

  useEffect(() => {
    console.log(timeDeliveryCheckbox);
  }, [timeDeliveryCheckbox])


  const changeTabActive = (index) => {
    index === activeTab ? setActiveTab(0) : setActiveTab(index);
  }

  const formTimeDelivery  = useFormik({
    initialValues: {
      startTime: '',
      endTime: '',
      interval: '',
      checkbox: false,
    },
    validationSchema: !timeDeliveryCheckbox 
    ? Yup.object().shape({
      startTime: 
      Yup.string()
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
        .required('Required'),
    })
    : Yup.object().shape({
        interval: Yup.string()
        .min(2, 'Too Short!')
        .max(5, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: values => {
      formTimeDelivery.resetForm()
      alert(JSON.stringify(values, null, 2));
    },
  });     

  const formTimePickup  = useFormik({
    initialValues: {
      startTime: '',
      endTime: '',
      interval: '',
      checkbox: false,
    },
    validationSchema: !timePickupCheckbox 
    ? Yup.object().shape({
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
        .required('Required'),
    })
    : Yup.object().shape({
        interval: Yup.string()
        .min(2, 'Too Short!')
        .max(5, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: values => {
      formTimePickup.resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });

  const priceDeliveryForm  = useFormik({
    initialValues: {
      priceDelivery: '',
      priceDeliveryShare: '',
    },
    validationSchema: Yup.object().shape({
      priceDelivery: Yup.number()
        .min(1, 'Too Short!')
        .required('Required'),
  
        priceDeliveryShare: Yup.number()
        .min(1, 'Too Short!')
        .required('Required'),
    }),
    onSubmit: values => {
      priceDeliveryForm.resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });

  const offApp  = useFormik({
    initialValues: {
      reason: '',
    },
    validationSchema: Yup.object().shape({
      reason: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: values => {
      offApp.resetForm()
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
          <form onSubmit={formTimeDelivery.handleSubmit}>
          <div className='startEnd'>
            <div className='input'>
              <label className='inputLabel' htmlFor='startTime'>Початок</label>
              <InputMask 
                className='timeInput'
                placeholder='00:00'
                id='startTime'
                name='startTime'
                value={formTimeDelivery.values.startTime}
                onChange={formTimeDelivery.handleChange}
                disabled={timeDeliveryCheckbox ? true : false}
                mask="12:32"
                formatChars={{
                  '1': '[0-2]',
                  '2': '[0-9]',
                  '3': '[0-5]',
                }}
              /> 
              {formTimeDelivery.touched.startTime && formTimeDelivery.errors.startTime ? (
              <div>{formTimeDelivery.errors.startTime}</div>
              ) : null}
 
            </div>
            <div className='input'>
              <label className='inputLabel' htmlFor='endTime'>Кінець</label>
              <InputMask 
                className='timeInput'
                placeholder='00:00'
                id='endTime'
                name='endTime'
                value={formTimeDelivery.values.endTime}
                onChange={formTimeDelivery.handleChange}
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

        
          <div className='checkbox'>
          <input className='customCheckbox' checked={timeDeliveryCheckbox ? true : false} name='toggle' onChange={() => setTimeDeliveryCheckbox(!timeDeliveryCheckbox)} type="checkbox" id="checkbox-1"/>
          <label htmlFor="checkbox-1">цілодобово</label>
          </div>

          <div className='interval'>
          <label htmlFor='intervalInput'>Укажіть інтервал самовивозу</label>
          <InputMask
            className='intervalInput' 
            placeholder='00 хв'
            id='intervalInput'
            name='interval'
            value={formTimeDelivery.values.interval}
            onChange={formTimeDelivery.handleChange}
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
        <form onSubmit={formTimePickup.handleSubmit}>

        <div className='startEnd'>
          <div className='input'>
            <label className='inputLabel' htmlFor='startTime'>Початок</label>
            <InputMask 
              className='timeInput'
              placeholder='00:00'
              id='startTime'
              disabled={timePickupCheckbox ? true : false}
              mask="12:32"
                formatChars={{
                  '1': '[0-2]',
                  '2': '[0-9]',
                  '3': '[0-5]',
              }}
              value={formTimePickup.values.startTime}
              onChange={formTimePickup.handleChange}
            /> 
          </div>
          <div className='input'>
            <label className='inputLabel' htmlFor='endTime'>Кінець</label>
            <InputMask 
              className='timeInput'
              placeholder='00:00'
              disabled={timePickupCheckbox ? true : false}
              id='endTime'
              mask="12:32"
              formatChars={{
                  '1': '[0-2]',
                  '2': '[0-9]',
                  '3': '[0-5]',
                }}
              value={formTimePickup.values.endTime}
              onChange={formTimePickup.handleChange}
            />
          </div> 
        </div>  

        <div className='checkbox'>
        <input name='checkbox' className='customCheckbox' checked={timePickupCheckbox ? true : false} onChange={() => setTimePickupCheckbox(!timePickupCheckbox)} type="checkbox" id="checkbox-1"/>
        <label htmlFor="checkbox-1">цілодобово</label>
        </div>

        <div className='interval'>
        <label htmlFor='intervalInput'>Укажіть інтервал самовивозу</label>
        <InputMask
            className='intervalInput' 
            placeholder='00 хв'
            id='intervalInput'
            name='interval'
            value={formTimePickup.values.interval}
            onChange={formTimePickup.handleChange}
            mask="12хв"
            formatChars={{
              '1': '[0-5]',
              '2': '[0-9]'
            }}
            />
        </div>

        <button type='submit'>Підтвердити</button>

        </form>}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Вартість доставки"} 
          handleClick={() => changeTabActive(3)}
          opened={activeTab===3 ? true : false}
        />
        {activeTab===3 && <form onSubmit={priceDeliveryForm.handleSubmit}>
          <div className='input'>
              <label className='inputLabel' htmlFor='deliveryPrice'>Вартість доставки</label>
              <input 
                className='priceInput'
                placeholder='0 грн'
                id='deliveryPrice'
                name='priceDelivery'
                value={priceDeliveryForm.values.priceDelivery}
                onChange={priceDeliveryForm.handleChange}
              /> 
              {priceDeliveryForm.touched.startTime && priceDeliveryForm.errors.startTime ? (
              <div>{priceDeliveryForm.errors.startTime}</div>
              ) : null}
          </div>

          <div className='input'>
              <label className='inputLabel' htmlFor='deliveryPrice'>Сума замовлення, від якої <br/> доставка безкоштовна</label>
              <input 
                className='priceInput'
                placeholder='0 грн'
                id='deliveryPrice'
                name='priceDeliveryShare' 
                value={priceDeliveryForm.values.priceDeliveryShare}
                onChange={priceDeliveryForm.handleChange}
              /> 
              {priceDeliveryForm.touched.startTime && priceDeliveryForm.errors.startTime ? (
              <div>{priceDeliveryForm.errors.startTime}</div>
              ) : null}
          </div>
          <button type='submit'>Підтвердити</button>
        </form>}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Акційні пропозиції"} 
          handleClick={() => changeTabActive(4)}
          opened={activeTab===4 ? true : false}
        />
        {activeTab===4 && <Shares />}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Вимкнути додаток"} 
          inline={{color: "#F80F39"}} 
          handleClick={() => changeTabActive(5)}
          opened={activeTab===5 ? true : false}
        />
        {activeTab===5 && <form onSubmit={offApp.handleSubmit}>

          <div className='input'>
              <label className='inputLabel' htmlFor='reasonShutdown'>Напишіть повідомлення (причину вимкнення)</label>
              <input 
                className='reasonShutdown'
                placeholder='текст'
                id='reasonShutdown'
                name='reason'
                value={offApp.values.reason}
                onChange={offApp.handleChange}
              /> 
              {offApp.touched.reason && offApp.errors.reason ? (
              <div>{offApp.errors.reason}</div>
              ) : null}
            </div>

        <button type='submit'>Підтвердити</button>

        </form>}
      </div>
    </div>
  );
}

export default App;
