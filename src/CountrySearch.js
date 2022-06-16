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
    // const state = {
    //     selectedCountry: ""
    // }

    const [country, setCountry] = useState("")
    // const [content, setContent] = useState("")

    // const handleSubmit = async (e) => {
    //     // store the states in the form data
    //     this.state.selectedCountry = e.value;

    //     window.location.href = `https://localhost:3000/result/${this.state.selectedCountry}`;
    // }

    // const tes = async () => {
    //     if (typeof fetch == 'undefined') return
    //     const response = await fetch('https://restcountries.com/v2/name/indonesia')
    //     const content = await response.json()

    //     console.dir({ content })

    //     setContent({ content: JSON.stringify(content) })
    // }

    const onChange = event => {
        setCountry(event)
    }
    // const onChange = event => {
    //     setCountry({
    //         country: event || []
    //     })
    // }

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
                                    primary25: 'lightgrey',
                                    primary: 'purple',
                                }
                            })}
                        />
                    </form>
                </Col>
            </Row>
        </Container >
    )
}

export default CountrySearch