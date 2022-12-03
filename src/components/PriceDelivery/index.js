import React from "react";
import * as Yup from 'yup';
import { useFormik  } from 'formik';



const PriceDelivery = () => {

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
    

    return (
        <form onSubmit={priceDeliveryForm.handleSubmit}>
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
              {priceDeliveryForm.touched.priceDelivery && priceDeliveryForm.errors.priceDelivery ? (
              <div>{priceDeliveryForm.errors.priceDelivery}</div>
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
              {priceDeliveryForm.touched.priceDeliveryShare && priceDeliveryForm.errors.priceDeliveryShare ? (
              <div>{priceDeliveryForm.errors.priceDeliveryShare}</div>
              ) : null}
          </div>
          <button type='submit'>Підтвердити</button>
        </form>
    )
}

export default PriceDelivery;