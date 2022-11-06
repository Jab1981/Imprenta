import React, { Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from "../layout/MetaData"
import { useParams } from 'react-router-dom'
import { getProductDetails, clearErrors} from '../../actions/productActions'
import { useAlert} from 'react-alert'
import {Carousel} from 'react-bootstrap'


const ProductDetails = () => {
  const {loading,product,error} = useSelector(state=>state.productDetails)
  const{id} = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(()=>{
    dispatch(getProductDetails(id))
    if (error){
      alert.error(error);
      dispatch(clearErrors())
    }

  },[dispatch,alert,error,id])


  return (
    <Fragment>
      {loading ? <i class="fa fa-spinner fa-spin">...</i>:(
          
<Fragment>
        <MetaData title={product.nombre}></MetaData>
  <div className='row d-flex justify-content-around'>
    <div className='col-12 col-lg-5 img-fluid mt-5' id='imagen_impresora'>
        <Carousel pause='hover'>
          {product.imagen && product.imagen.map(img =>(
            <Carousel.Item key={img.public_id}>
              <img className='d-block w-100 mx-auto' src={"../"+ img.url} alt={product.nombre}></img>
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
                <span className='btn btn-outline-danger minus'>-</span>
                <input type='number' className='form-control count d-inline' readOnly/>
                <span className='btn btn-outline-success minus'>+</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary m-4" type="button" id='carrito_btn' >Agregar <i class="fa fa-truck"></i><span className='ml-1' disabled={product.inventario===0}></span></button>
              <hr/>
              <p>Stock: <span id='stock_estado' className={product.inventario>0? 'greenColor':'redColor'}>{product.inventario>0? 'En existencia':'Agotado'}</span></p>
              <hr/>
              <h4 className='mt-1'>Descripción</h4>
              <p>{product.descripcion}</p>
              <hr/>
              <p id='vendedor'>Vendido por: <h6>{product.vendedor}</h6></p>
              <button className='btn btn-sm btn-outline-info' type='button' id='btn_review' data-toogle='modal' 
              data-Target='#calificacionModal'>Comentarios</button>
              </div>
        
              </div>
</Fragment>

      )}
    </Fragment>
    
  
  )
}

export default ProductDetails;

