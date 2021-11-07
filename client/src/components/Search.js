import React, { useState } from 'react';
import Button from './Button';
import Loader from './Loader';


const Search = ({ getResult, isLoading, handleLoading, handleResult }) => {
    const [input, setInput] = useState(''); // '' is the initial state value

    const onClick = async (e) => {
        e.preventDefault();
        let name = input.trim();
        if(!name) {
            alert('please enter a name');
            return;
        }
        
        handleResult('')
        handleLoading(true)
        await getResult(name)
        setInput('')
    }
    
    return (
        <form>
            <div>
                <input type="text" value={input} placeholder='Username' onInput={e => setInput(e.target.value)}/>
                <Button onClick={onClick} color="white" text="Search" />
                {isLoading ? <Loader /> : null}
            </div>
        </form>
    )
}

export default Search
