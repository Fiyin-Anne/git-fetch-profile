import React from 'react'
import {ImSad} from 'react-icons/im'

const ErrorPage = ({ error }) => {
    return (
        <div className="errorpage">
            <ImSad size='50px'/>
            <p>{error}</p>
        </div>
    )
}

export default ErrorPage
