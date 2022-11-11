import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

export const Dashboard = () => {
  return (
    <Fragment>
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar/>
            </div>
            <div className='col-12 col-md-10'>
                <h1 className='my-4'>Panel de Control</h1>
                <Fragment>
                    <MetaData title={'Panel de control'}/>
                    <div className='container mt-3'>
                    <div className="border border-success rounded-4 text-center" ><span>Ventas totales<br/>$40000</span></div>
                    <br/>
                    <div className="border border-info rounded-4 text-center" ><span>Productos<br/>50<br/></span>
                    <Link to='/'><span className='float-rigth'>Ver Detalles</span></Link>
                    </div>
                    <div className="border border-warning rounded-4 text-center" ><span>Pedidos<br/>50<br/></span>
                    <Link to='/'><span className='float-rigth'>Ver Detalles</span></Link>
                    </div>
                    <div className="border border-primary rounded-4 text-center" ><span>Usuarios<br/>50<br/></span>
                    <Link to='/'><span className='float-rigth'>Ver Detalles</span></Link>
                    </div>
                    <br/>
                    <div className="border border-danger rounded-4 text-center" ><span>Agotados<br/>20</span></div>
                    </div>
                </Fragment>
            </div>
        </div>
    </Fragment>
  )
}
