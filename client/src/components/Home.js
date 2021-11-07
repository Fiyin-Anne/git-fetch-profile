import React from 'react'
import Search from './Search'
import { BsGithub, BsSearch } from 'react-icons/bs'

const Home = ({ welcome, getResult, isLoading, handleLoading, handleResult  }) => {
    return (
        <>
            <header className='header'>
                <h1><BsGithub /> Github Profile Search <BsSearch /></h1>
                <p>
                    {welcome}
                </p>
            </header>
            <Search 
                getResult={getResult} 
                isLoading={isLoading} 
                handleLoading={handleLoading} 
                handleResult={handleResult}
            />
        </>
    )
}

export default Home
