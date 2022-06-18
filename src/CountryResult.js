import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const Button = styled.button`
  background-color: #8362F2;
  color: white;
  font-size: 18px;
  padding: 15px 30px;
  border-radius: 10px;
  margin: 10px 0px;
  cursor: pointer;
  border-width: 0;
`;

const Spell = styled.button`
  background-color: #8DD4CC;
  color: white;
  font-size: 12px;
  padding: 7px 15px;
  border-radius: 50px;
  margin: 0px 5px 30px 0;
  border-width: 0;
`;

function CountryResult() {

    const urlParams = useParams()

    const [contents, setContents] = useState({})

    const [callings, setCallings] = useState([])

    const [currency, setCurrency] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(function () {
        async function getContent() {
            const request = await fetch(`https://restcountries.com/v2/name/${urlParams.slug}?fullText=true`)
            const response = await request.json()

            setContents(response)
            setLoading(false)
        }
        getContent()
    }, [urlParams]
    )

    useEffect(function () {
        async function getCalling() {
            const request = await fetch(`https://restcountries.com/v2/callingcode/${contents.map(function (e) { return e.callingCodes })}`)
            const response = await request.json()

            let hasil = response.map(e => e.name)

            setCallings(hasil)
            setLoading(false)
        }
        getCalling()
    })

    useEffect(function () {
        async function getCurrency() {
            const request = await fetch(`https://restcountries.com/v2/currency/${contents.map(function (e) {
                return e.currencies.map(e => e.code)
            })}`)
            const response = await request.json()

            let hasil = response.map(e => e.name)

            setCurrency(hasil)
            setLoading(false)
        }
        getCurrency()
    })

    const positionRef = React.useRef({
        x: 0,
        y: 0,
    });

    const popperRef = React.useRef(null);

    const areaRef = React.useRef(null);

    const handleMouseMove = (event) => {
        positionRef.current = { x: event.clientX, y: event.clientY };

        if (popperRef.current != null) {
            popperRef.current.update();
        }
    };

    return (

        <div>
            {/* Loading content */}
            {loading && (
                <div className='Loading'>
                    <h1>
                        Loading...
                    </h1>
                </div>
            )}

            {/* Content */}
            {!loading && (
                <div className='Result'>
                    <a href='/'>
                        <Button>
                            Back to Homepage
                        </Button>
                    </a>
                    {
                        contents.map(function (content) {
                            return (
                                <div key={content.name}>
                                    <div className='Tittle'>
                                        <h1 className='CountryName'>
                                            {content.name}
                                        </h1>
                                        <img className='Flag' src={`${content.flag} `}></img>
                                    </div>
                                    <div>
                                        {content.altSpellings.map(e =>
                                            <Spell>
                                                {e}
                                            </Spell>
                                        )}
                                    </div>
                                    <div className='ResultCard'>
                                        <div className='LatLongCard'>
                                            <Card sx={{ width: 540 }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="b" component="div">
                                                            <h1 className='LatLong'>
                                                                LatLong
                                                            </h1>
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {content.latlng.map(e =>
                                                                <h1 className='LatLong2'>
                                                                    {e.toFixed(1)}
                                                                </h1>
                                                            )}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card sx={{
                                                width: 540,
                                                height: 126
                                            }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <h1 className='Capital'>
                                                                Capital: <span>{content.capital}</span>
                                                            </h1>
                                                            <h1 className='Capital'>
                                                                Region: <span>{content.region}</span>
                                                            </h1>
                                                            <h1 className='Capital'>
                                                                Subregion: <span>{content.subregion}</span>
                                                            </h1>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    </div>
                                    <div className='More'>
                                        <div className='CallingCode'>
                                            <h1 className='CallingCodeTittle'>Calling Code</h1>
                                            <h1 className='CallingCodeContent'>{content.callingCodes}</h1>
                                            <Tooltip
                                                title={`${callings} `}
                                                placement="top"
                                                arrow
                                                PopperProps={{
                                                    popperRef,
                                                    anchorEl: {
                                                        getBoundingClientRect: () => {
                                                            return new DOMRect(
                                                                positionRef.current.x,
                                                                areaRef.current.getBoundingClientRect().y,
                                                                0,
                                                                0,
                                                            );
                                                        },
                                                    },
                                                }}
                                            >
                                                <h1 className='CallingCodeCountries'><span ref={areaRef}
                                                    onMouseMove={handleMouseMove}>{callings.length} countries</span> with this calling code</h1>
                                            </Tooltip>
                                        </div>
                                        <div className='CallingCode'>
                                            <h1 className='CallingCodeTittle'>Currency</h1>
                                            <h1 className='CallingCodeContent'>{content.currencies.map(e => e.code)}</h1>
                                            <Tooltip
                                                title={`${currency} `}
                                                placement="top"
                                                arrow
                                                PopperProps={{
                                                    popperRef,
                                                    anchorEl: {
                                                        getBoundingClientRect: () => {
                                                            return new DOMRect(
                                                                positionRef.current.x,
                                                                areaRef.current.getBoundingClientRect().y,
                                                                0,
                                                                0,
                                                            );
                                                        },
                                                    },
                                                }}
                                            >
                                                <h1 className='CallingCodeCountries'><span ref={areaRef}
                                                    onMouseMove={handleMouseMove}>{currency.length} countries</span> with this currency</h1>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
            }
        </div >

    )
}

export default CountryResult