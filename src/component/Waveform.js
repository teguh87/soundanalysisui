import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js';
import styled from 'styled-components';

import colormap from 'colormap';

import {Grid, Col, Row} from 'react-styled-flexboxgrid'

const ChartContainer = styled.div`
height: 100px;  
width: 100%;
background: #FFFFFF;
`;

const Label = styled.div`
text-align: center;
padding: 10px;
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 24px;

`

const Wave = styled.div`
width: 30%;
height: 50px;
`;

const SpectogramChart = styled.div`
width: 30%;
height: 50px;
`;

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #EFEFEF;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: #DDD;
  }
`;


function Waveform({ audio, label }) {

    const waveFormContainerRef = useRef();
    const spectrogramRef = useRef();

    const waveSurferRef = useRef({
        isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState(false)


    useEffect(() => {
        const colors = colormap({
            colormap: 'hot',
            nshades: 256,
            format: 'float'
        });
        const waveform = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: waveFormContainerRef.current,
            backend: 'WebAudio',
            height: 80,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: '#EFEFEF',
            cursorColor: 'transparent',
            plugins: [
                Spectrogram.create({
                    container: spectrogramRef.current,
                    labels: true,
                    fftSamples: 512,
                    frequencyMax: 8000,
                    colorMap: colors,
                    height: 256,
                    width: 500
                })
            ]
        });
        waveform.load(audio);
        waveform.on('ready', () => {
            waveSurferRef.current = waveform
        });
        return () => {
            waveform.destroy();
        }
    }, [audio])

    return (
        <ChartContainer>
            <Grid>
                <Row>
                <Col xs={12} sm={12} md={12} lg={12}><Label style={{width: '50%'}}>{label}</Label></Col>
                </Row>
                <Row>
                    <Col xs={12} sm={3} md={2} lg={1} >
                    <PlayButton onClick={() => {
                            waveSurferRef.current.playPause()
                            toggleIsPlaying(waveSurferRef.current.isPlaying())
                        }} >
                            {isPlaying ? 'pause' : 'play'}
                        </PlayButton>
                    </Col>
                    <Col xs={12} sm={9} md={10} lg={11}><Wave ref={waveFormContainerRef} /></Col>
                </Row>
                <Row>
                    <Col xs={12} sm={3} md={2} lg={1} ></Col>
                    <Col xs={12} sm={9} md={10} lg={11}><SpectogramChart ref={spectrogramRef} /></Col>
                </Row>
                
        </Grid>
        </ChartContainer>
        

    );
}

Waveform.prototype = {
    audio: PropTypes.string,
    label:  PropTypes.string
}

export default Waveform;