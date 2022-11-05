import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'

const ProductDetails = () => {
  return (
   <Fragment>
        <MetaData title='Impresora 3D Pri 3'></MetaData>
          <div className='row d-flex justify-content-around'>
            <div className='col-12 col-lg-5 img-fluid mt-5' id='imagen_impresora'>
                <img src='../../images/productos/impresora_pri3.jpg' alt='impresora 3D' height= '450' width='410'></img>
            </div>
                <div className='col-12 col-lg-5 mt-5'>
                    <h3>Impresora 3D Pri 3</h3>
                    <p id='product_id'>Product #3366472</p>

                </div>
          </div>
   </Fragment>
  )
}

export default ProductDetails;
