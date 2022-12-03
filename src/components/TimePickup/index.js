import React, {useState} from "react";
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { useFormik  } from 'formik';


const TimePickup = () => {

    const [ timeDeliveryCheckbox, setTimeDeliveryCheckbox ] = useState(false);


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

    return (
        <form onSubmit={formTimeDelivery.handleSubmit}>
          <div className='startEnd'>
            <div className='input'>
              <label className='inputLabel' htmlFor='startTime'>Початок</label>
              <input 
                className='timeInput'
                type='time'
                id='startTime'
                name='startTime'
                value={formTimeDelivery.values.startTime}
                onChange={formTimeDelivery.handleChange}
                disabled={timeDeliveryCheckbox ? true : false}
              />
              {formTimeDelivery.touched.startTime && formTimeDelivery.errors.startTime ? (
              <div>{formTimeDelivery.errors.startTime}</div>
              ) : null}
 
            </div>
            <div className='input'>
              <label className='inputLabel' htmlFor='endTime'>Кінець</label>
              <input 
                className='timeInput'
                type='time'
                id='endTime'
                name='endTime'
                value={formTimeDelivery.values.endTime}
                onChange={formTimeDelivery.handleChange}
                disabled={timeDeliveryCheckbox ? true : false}
              />
              {formTimeDelivery.touched.endTime && formTimeDelivery.errors.endTime ? (
              <div>{formTimeDelivery.errors.endTime}</div>
              ) : null}
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
            {formTimeDelivery.touched.interval && formTimeDelivery.errors.interval ? (
              <div>{formTimeDelivery.errors.interval}</div>
              ) : null}
          </div>

          <button type="submit">Підтвердити</button>

          </form>
    )
} 

export default TimePickup;