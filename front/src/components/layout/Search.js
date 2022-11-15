import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();

    const searchHandler = (e) =>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }
        else{
            navigate('/')
        }
    }

    return (
        
            <form  onSubmit={searchHandler}>
                <div className='d-flex'>
                <input className='form-control me-2' type="Search" placeholder="Encuentre su producto" aria-label="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button class="btn btn-outline-success me-2" type="submit">Buscar</button>
                </div>
        </form>

    );
};

export default Search