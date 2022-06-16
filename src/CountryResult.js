import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function CountryResult() {

    const urlParams = useParams()

    return (
        <div>
            <h1>
                {urlParams.slug}
            </h1>
        </div>
    )
}

export default CountryResult