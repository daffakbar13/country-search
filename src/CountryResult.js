import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
                                    <h1 className='CountryName'>
                                        {content.name}
                                    </h1>
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
                                                                Capital : <span>{content.capital}</span>
                                                            </h1>
                                                            <h1 className='Capital'>
                                                                Region : <span>{content.region}</span>
                                                            </h1>
                                                            <h1 className='Capital'>
                                                                Subregion : <span>{content.subregion}</span>
                                                            </h1>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
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