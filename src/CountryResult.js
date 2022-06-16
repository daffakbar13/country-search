import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

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

    const Button = styled.button`
  background-color: #8362F2;
  color: white;
  font-size: 18px;
  padding: 15px 30px;
  border-radius: 10px;
  margin: 10px 0px;
  cursor: pointer;
  border-width: 0;
`

    return (

        <div className='Result'>
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
                                    <a href='/'>
                                        <Button>
                                            Back to Homepage
                                        </Button>
                                    </a>
                                    <h1 className='CountryName'>
                                        {e.name}
                                    </h1>
                                    <div className='CountryName'>

                                    </div>
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