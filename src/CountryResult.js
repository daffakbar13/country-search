import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CountryResult() {

    const urlParams = useParams()

    const [content, setContent] = useState({})

    const [loading, setLoading] = useState(true)

    useEffect(function () {
        async function getContent() {
            const request = await fetch(`https://restcountries.com/v2/name/${urlParams.slug}`)
            const response = await request.json()

            setContent(response)
            setLoading(false)
        }
        getContent()
    }, [urlParams]
    )

    return (

        <div className='App'>
            {/* Loading content */}
            {loading && (
                <div>
                    <h1>
                        Loading...
                    </h1>
                </div>
            )}

            {/* Content */}
            {!loading && (
                <div>
                    {
                        content.map(function (e) {
                            return (
                                <div key={e.name}>
                                    <h1>
                                        {e.name}
                                    </h1>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>

    )
}

export default CountryResult