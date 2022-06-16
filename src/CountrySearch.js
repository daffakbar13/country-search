import React from 'react'
import {
    Container,
    Row,
    Col
}
    from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const animatedComponent = makeAnimated()

function CountrySearch() {

    const [country, setCountry] = useState("")

    const onChange = event => {
        setCountry(event)
    }

    const loadOptions = async (inputText, callback) => {
        const response = await fetch(`https://restcountries.com/v2/name/${inputText}`)
        const json = await response.json()

        callback(json.map(i => ({ label: i.name, value: i.name })))
    }

    const navigate = useNavigate()

    function submithandler(event) {
        event.preventDefault()

        navigate(`/result/${country.value}`)
    }

    return (

        <div className='App'>
            < Container >
                <Row>
                    <Col>
                        <h1>
                            Country
                        </h1>
                        <form onSubmit={submithandler}>
                            <AsyncSelect
                                name='country'
                                components={animatedComponent}
                                value={country}
                                onChange={onChange}
                                placeholder={'Type any country name'}
                                loadOptions={loadOptions}
                                theme={theme => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#F4F4F4',
                                        primary: '#8362F280',
                                    }
                                })}
                            />
                        </form>
                    </Col>
                </Row>
            </Container >
        </div>

    )
}

export default CountrySearch