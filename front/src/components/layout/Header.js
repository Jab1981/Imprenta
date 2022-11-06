import React, {Fragment} from 'react'

const Header = () => {
  return (
    <Fragment>

<nav className='navbar navbar-expand-lg '>
  <div className='container-fluid'>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <div className='navbar-brand'>Litografia Pulgarin</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <form class="container-fluid justify-content-start">
    <button className="btn btn-sm btn-outline-success me-2" type="button">Inicio sesion</button>
    <button className="btn btn-sm btn-outline-secondary" type="button">Carrito <i class="fa fa-truck"></i><span className='ml-1' id='cart_count'> 2</span></button>
  </form>
   
    </div>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Encuentre su producto" aria-label="Search"></input>
      <button class="btn btn-outline-success" type="submit">Buscar</button>
    </form>
    </div>
</nav>

    </Fragment>
)}

export default Header

