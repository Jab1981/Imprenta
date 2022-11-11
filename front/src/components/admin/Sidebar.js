import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
<div className="sidebar-wrapper fl">
    <nav id='sidebar'>
        <ul className='list-unstyled components'>
            <li>
            <Link to='/admin/dashboard'><i className='fa fa-tachometer'></i>Administracion</Link>
            </li>
            <li>
                <a href='#productSubmenu' data-toggle='collapse' aria-expanded='false' className='dropdown-toggle'><i className='fa fa-product-hunt'></i>Productos</a>
                <ul className='collapse list-unstyled' id='productSubmenu'>
                    <li>
                        <Link to='/listaProductos'><i className='fa fa-clipboard'></i>Lista Productos</Link>
                    </li>
                    <li>
                        <Link to='/'><i className='fa fa-plus'></i>Crear Producto</Link>
                    </li>
                </ul>
            </li>

                    <li>
                        <Link to='/'><i className='fa fa-shopping-basket'></i>Pedidos</Link>
                    </li>

                    <li>
                        <Link to='/'><i className='fa fa-user'></i>Usuarios</Link>
                    </li>

                    <li>
                        <Link to='/'><i className='fa fa-user'></i>Reviews</Link>
                    </li>

        </ul>
    </nav>
</div>
  )
}
export default Sidebar