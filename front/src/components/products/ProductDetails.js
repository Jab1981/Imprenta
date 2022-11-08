import React, { Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from "../layout/MetaData"
import { useParams } from 'react-router-dom'
import {getProductDetails, clearErrors} from '../../actions/productActions'
import { useAlert} from 'react-alert'
import {Carousel} from 'react-bootstrap'


const ProductDetails = () => {
  const {loading,product,error} = useSelector(state=>state.productDetails)
  const{id} = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity, setQuantity]=useState(1)

  useEffect(()=>{
    dispatch(getProductDetails(id))
    if (error){
      alert.error(error);
      dispatch(clearErrors())
    }

  },[dispatch,alert,error,id])

  const increaseQty = () =>{
      const contador = document.querySelector('.count')
      
      if (contador.valueAsNumber>=product.inventario)
      return;
      const qty = contador.valueAsNumber+1;
      setQuantity (qty)
  }

  const decreaseQty = () =>{
      const contador = document.querySelector('.count')
    
      if (contador.valueAsNumber <=1)
      return;
      const qty = contador.valueAsNumber-1;
      setQuantity (qty)
}

  return (
    <Fragment>
      {loading ? <i class="fa fa-spinner fa-spin"></i>:(
          
<Fragment>
        <MetaData title={product.nombre}></MetaData>
  <div className='row d-flex justify-content-around'>
    <div className='col-12 col-lg-5 img-fluid mt-5' id='imagen_impresora'>
        <Carousel pause='hover'>
          {product.imagen && product.imagen.map(img =>(
            <Carousel.Item key={img.public_id}>
              <img className='d-block w-100' src={"../"+ img.url} alt={product.nombre}></img>
            </Carousel.Item>
          ))}
        </Carousel>
    </div>
   
        <div className='col-12 col-lg-6 mt-5'>
            <h3>{product.nombre}</h3>
            <p id='product_id'>ID Producto {product._id}</p>
            <hr/>
            <div className='rating mt-auto'>
              <div className='rating-outer'>
                <div className='rating-inner' style ={{width:`${(product.calificacion/5)*100}%`}}></div>
              </div>
                <span id='No_opiniones'>  {product.numCalificaciones} Reviews</span>
              </div>
              <hr/>
              <p id='precio_producto'>Precio: ${product.precio}</p>
              <div className='stockCounter d-inline'>
                <span className='btn btn-outline-danger minus' onClick={decreaseQty}>-</span>
                <input type='number' className='form-control-outline count d-inline' value={quantity} readOnly/>
                <span className='btn btn-outline-success minus' onClick={increaseQty}>+</span>
              </div>
              <button className="btn btn-sm btn-outline-warning m-4" type="button" id='carrito_btn' >Agregar <i class="fa fa-truck"></i><span className='ml-1' disabled={product.inventario===0}></span></button>
              <hr/>
              <p>Stock: <span id='stock_estado' className={product.inventario>0? 'greenColor':'redColor'}>{product.inventario>0? 'Disponible':'No Disponible'}</span></p>
              <hr/>
              <h5 className='mt-1'>Descripción</h5>
              <p>{product.descripcion}</p>
              <hr/>
              <p id='vendedor'>Vendido por: {product.vendedor}</p>
              <button id="btn_review" type="button" className="btn btn-sm btn-outline-info mt-4" 
              data-toggle="modal" data-target="#ratingModal">Comentarios</button>
              <div className="alert alert-danger mt-5" type="alert">Inicia Sesión para dejar tu review</div>
          
              {/*Mensaje emergente para dejar opinion y calificacion*/}
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div className="modal" id="ratingModal" tabIndex="-1" role="dialog"
                  aria-labelledby='ratingModalLabel' aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">Enviar Review</h5>
                          <button type="button" className='close' data-dismiss="modal" aria-label='Close'>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                          </ul>

                          <textarea name="review" id="review" className="form-control mt3"></textarea>

                          <button className="btn my-3 float-left review-btn px-4 text-white" 
                          data-dismiss="modal" aria-label="Close">Enviar</button>
                        
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

     </div>
        
    </div>
   </Fragment>

  )}
</Fragment>
    
  
  )
}

export default ProductDetails;

