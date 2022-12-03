import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const OffApp = () => {

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
        <form onSubmit={offApp.handleSubmit}>

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

        </form>
    )
}

export default OffApp;