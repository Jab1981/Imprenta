import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
const Header = () => {
  return (
    <Fragment>

<nav className='navbar navbar-expand-lg'>
  <div className='container-fluid'>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <div className='navbar-brand'>Litografia Pulgarin</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    </div>
    <div className='d-flex flex-row-reverse'>
  <button className="btn btn-outline-warning" type="button">Carrito <i class="fa fa-truck"></i><span className='ml-1' id='cart_count'> 2</span></button>

 <div className='dropdown dropdown-menu-end'>
  <Link to='#!'type="button" className='btn btn-outline-primary me-2' id='drownDownMenu' data-toggle='dropdown' aria-haspopup='true'
  aria-expanded='false'>Menu Principal </Link>
  <div className="dropdown-menu" aria-labelledby='drownDownMenu'>
    <Link className="dropdown-item" to='/dashboard'>Adm. Productos</Link>
    <Link className="dropdown-item" to='/'>Pedidos</Link>
    <Link className="dropdown-item" to='/'>Mi Cuenta</Link>
    <Link className="dropdown-item" to='/'>Cerrar Sesión</Link>
  </div>
</div>
{/*Barra de Busqueda */}
 <Search/> 
</div>
</div>
</nav>

    </Fragment>
)}

export default Header

