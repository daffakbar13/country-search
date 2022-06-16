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
        <div>
            {/* Loading element */}
            {loading && (
                <div>
                    <h1>
                        Loading...
                    </h1>
                </div>
            )}
            {!loading && (
                <div>
                    {
                        content.map(function (e) {
                            return (
                                <h1 key={e.name}>
                                    {e.name}
                                </h1>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default CountryResult