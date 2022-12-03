import React, { useState } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';


const TimeDelivery = () => {

    const [ timePickupCheckbox, setTimePickupCheckbox ] = useState(false);


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

    return (
        <form onSubmit={formTimePickup.handleSubmit}>

        <div className='startEnd'>
          <div className='input'>
            <label className='inputLabel' htmlFor='startTime'>Початок</label>
            <input
              className='timeInput'
              placeholder='00:00'
              id='startTime'
              disabled={timePickupCheckbox ? true : false}
              type='time'
              value={formTimePickup.values.startTime}
              onChange={formTimePickup.handleChange}
            /> 
            {formTimePickup.touched.startTime && formTimePickup.errors.startTime ? (
              <div>{formTimePickup.errors.startTime}</div>
              ) : null}
          </div>
          <div className='input'>
            <label className='inputLabel' htmlFor='endTime'>Кінець</label>
            <input 
              className='timeInput'
              placeholder='00:00'
              disabled={timePickupCheckbox ? true : false}
              id='endTime'
              type='time'
              value={formTimePickup.values.endTime}
              onChange={formTimePickup.handleChange}
            />
            {formTimePickup.touched.endTime && formTimePickup.errors.endTime ? (
              <div>{formTimePickup.errors.endTime}</div>
              ) : null}
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
            {formTimePickup.touched.interval && formTimePickup.errors.interval ? (
              <div>{formTimePickup.errors.interval}</div>
              ) : null}
        </div>

        <button type='submit'>Підтвердити</button>

        </form>
    )
}

export default TimeDelivery;