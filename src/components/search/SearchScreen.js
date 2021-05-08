import React, { useMemo, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { HeroCard } from '../../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { getHeroesBySuperhero } from '../../selectors/getHeroesBySuperhero';


export const SearchScreen = ({history}) => {

    
    const location = useLocation();
    const {q = ''} = queryString.parse(location.search)
    const [{search}, handleInputChange] = useForm({
        search: q,
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hola');
        if(search.trim().length<1) {
            return '';
        }
        history.push(`?q=${search}`);
    }
    const heroes = useMemo(() => getHeroesBySuperhero(q), [q])

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr/>
            <div className="row">
                <div className="col-3">
                    <h4>SearchForm</h4>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="Find your hero"
                            name="search"
                            className="form-control"
                            onChange={handleInputChange}
                            value={search}
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-9">
                    <h4>Results</h4>
                    <hr/>
                    {   (q==='')
                        && <div className="alert alert-info">
                            Search a hero
                        </div>
                    }
                    {   (q!==''  && heroes.length===0)
                        && <div className="alert alert-danger">
                            There is no hero called {q}
                        </div>
                    }
                    {
                        heroes.map( hero => (
                            <HeroCard key={hero.id} {...hero}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
