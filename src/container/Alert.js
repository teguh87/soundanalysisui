import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Waveform from "../component/Waveform";

import axios from "axios";

import cevron from '../cevron.svg';
import { Layout, Col, Row, Divider, List, Select, Form, Input, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import Sound1 from '../sound/1.wav'
import Sound2 from '../sound/2.wav'
import Sound3 from '../sound/3.wav'
import Sound4 from '../sound/4.wav'
import Sound5 from '../sound/5.wav'
import Sound6 from '../sound/6.wav'

const { Content } = Layout;
const { TextArea } = Input;

const WrapContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
-webkit-box-flex: 1;
flex-grow: 1;
`

const FormContent = styled.div`
box-shadow: rgb(20 46 110 / 10%) 0px 1px 8px;
border-radius: 3px;
position: relative;
background-color: rgb(255, 255, 255);
overflow: hidden;
display: flex;
flex-direction: column;
max-height: 680px;
-webkit-box-flex: 1;
flex-grow: 1;
transform: translate3d(0px, 0px, 0px);
`;

const HeaderContent = styled.div`
display: flex;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: justify;
justify-content: space-between;
padding: 24px 0px 20px;
flex-wrap: wrap;
gap: 20px 10px;
position: relative;
z-index: 10;
`;

const FormHeader = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin: 0px 20px;
gap: 20px;
@media screen and (min-width: 767.98px)
{
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
`;

const InnerContent = styled.div`
height: 100%;
overflow: hidden auto;
display: flex;
flex-direction: column;
-webkit-box-flex: 1;
flex-grow: 1;
border-top: 1px solid rgb(241, 245, 248);
`
const HeaderList = styled.div`
display: flex;
padding: 8px 24px 9px;
flex-wrap: wrap;
gap: 20px 10px;
position: relative;
z-index: 10;
max-height: 80px;
border-bottom: 1px solid rgb(241, 245, 248);
border-right: 1px solid rgb(241, 245, 248);
`;

const Label = styled.div`
display: flex;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: justify;
justify-content: space-between;
height: 40px;
gap: 10px;
padding: 0px 22px;
font-size: 0.875rem;
border-radius: 8px;
background-color: rgb(241, 245, 248);
`
const ButtonLabel = styled.button`
transition: opacity var(--transition);
border: none;
padding: 5px 0px 0px 9px;
background: transparent;
cursor: pointer
`
const GroupLabel = styled.div`
overflow: hidden;
position: relative;
width: 100%;
height: 34px;
border-bottom: 1px solid rgb(241, 245, 248);
border-right: 1px solid rgb(241, 245, 248);
&::before {
    left: 2px;
}
`
const ListGroup = styled.ul`
display: flex;
margin: 0px 2px;
gap: 1px;
height: 30px;
-webkit-box-align: center;
align-items: center;
border-radius: 8px;
padding: 0px 8px;
overflow-x: auto;
list-style: none;
&::after {
    content: "";
    position: absolute;
    top: 0px;
    background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
    height: 100%;
    width: 24px;
    z-index: 1;
    filter: blur(1px);
    display: block;
}
`;
const ListItem = styled.li`
pointer-events: none;
background-color: transparent;
color: rgb(65, 77, 85);
width: 92px;
`;

const Group = styled.a`
display: flex;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
width: 90px;
height: 40px;
text-transform: capitalize;
color: rgb(38, 98, 240);
border-radius: 8px;
transition: color var(--transition),background var(--transition);
`;
const Highlight = styled.div`
display: flex;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
border-radius: 20px;
padding: 3px 10px;
color: rgb(255, 255, 255);
font-size: 0.875rem;
gap: 10px;
background-color: #3478FC;
`;
const ListContainer = styled.div`
min-height: 125px;
height: 100%;
overflow: hidden auto;
display: flex;
flex-direction: column;
-webkit-box-flex: 1;
flex-grow: 1;
border-right: 1px solid rgb(241, 245, 248);
.ant-list-item {
    &:hover {
        background-color: rgba(243,244,246,.5);
    }
}
`;
const ListBody = styled.div`
padding: 20px 20px;
display: flex;
-webkit-box-pack: justify;
justify-content: space-between;
position: relative;
`;
const MainItem = styled.div`
display: flex;
flex-direction: column;
-webkit-box-pack: justify;
justify-content: space-between
width: 100%;
cursor: pointer;
`;
const DetailID = styled.span`
font-weight: 500;
margin-bottom: 10px;
`;
const DetailItem = styled.span`
font-size: 0.75rem;
display: flex;
gap: 8px;
position: relative;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`;
const Description = styled.span`
color: rgb(38, 98, 240);
font-size: 0.875rem;
margin-top:10px;
`;
const IsNew = styled.div`
aspect-ratio: 1 / 1;
position: relative;
padding: 5px;
width: 22px;
`;

const Dot = styled.span`
display: block;
border-radius: 50%;
width: 12px;
height: 12px;
position: relative;
background-color: rgba(52, 120, 252, 1);
border: 2px solid rgb(255, 255, 255);
z-index: 2;
`;
const Severity = styled.div`
display: flex;
flex-direction: column;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
height: 20px;
border-radius: 16px;
font-size: 0.625rem;
text-transform: capitalize;
padding: 0px 5px;
font-weight: 400;
color: rgb(45, 53, 59);
width: fit-content;
min-width: 22px;
position: relative;
z-index: 2;
`;

const SeverityMild = styled(Severity)`
background: rgb(104, 185, 132);
`;

const SeverityModerate = styled(Severity)`
background: rgb(255, 225, 93);
`;

const SeveritySevere = styled(Severity)`
background: rgb(224, 20, 76);
`;

const InputForm = styled.div`
padding: 11px 24px 24px;
height: 100%;
overflow: hidden auto;
display: flex;
flex-direction: column;
-webkit-box-flex: 1;
flex-grow: 1;
`;
const ButtonContainer = styled.div`
  .ant-btn-default {
    border-radius: 8px;
    background-color: rgb(38, 98, 240);
    color: rgb(255, 255, 255);
    font-size: 0.875rem;
    font-weight: 500;
    height: 40px;
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    gap: 8px;
    line-height: 1;
    transition: background-color var(--transition);
    box-shadow: none !important;
    border-color: transparent;
    &:hover, &:focus {
        background-color: rgb(15, 73, 212);
        color: rgb(255, 255, 255);
        box-shadow: none !important;
        border-color: transparent;
    }
  }
`;
export function Alert() {
    const [form] = Form.useForm();
    const [posts, setPost] = useState([]);
    const [selected, setSelected] = useState();
    const [filtered, setFiltred] = useState([])

    const mechines = [
        {
            value: 1,
            label: 'CNC Machine',
        },
        {
            value: 2,
            label: 'Milling Machine'
        }
    ];

    const causes = [
        {
            value: 1,
            label: 'Unknown Anomally'
        },
        {
            value: 2,
            label: 'Reason by machine'
        }
    ];

    const actions = [
        {
            value: 1,
            label: 'Mild'
        },
        {
            value: 2,
            label: 'Moderate'
        },
        {
            value: 3,
            label: 'Severe'
        }
    ];

    const sounds = [
        Sound1, Sound2, Sound3, Sound4, Sound5, Sound6
    ]

    const findById = (data, value) => {
        return data.find(x => x.value === value).label;
    };

    const ItemSeverity = (severity) => {
        if (severity === 1) {
            return <SeverityMild>Mild</SeverityMild>
        }
        if (severity === 2) {
            return <SeverityModerate>Moderate</SeverityModerate>
        }
        if (severity === 3) {
            return <SeveritySevere>Severe</SeveritySevere>
        }
    };

    const onSelectedItem = (item) => {
        const clicked = posts.find(_item => _item.id === item.id);

        form.setFieldsValue({
            mechine: clicked.from,
            cause: clicked.cause,
            action: clicked.severity,
            desc: clicked.comments
        });
        // clicked.audio = 'https://groundupai.s3.ap-southeast-1.amazonaws.com/sound/' + clicked.audio  +'.wav'
        setSelected(clicked)
    }

    const getData = () => {
        // getPostList().then( data => setPost(data))
        axios
            .get("http://209.97.166.231:8080/posts")
            .then((response) => {
                setPost(response.data)
            });

    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDate(date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    const toDate = (date) => {
        return 'Detected at ' + formatDate(new Date(date * 1000));
    }

    const handleOnChange = (event) => {
        // await getData();
        const filtered = posts.filter(p => p.from === event);
        setFiltred(filtered);
    }

    const update = (data, selected) => {
        return data.map(v => {
            if (v.id === selected.id) {
                v = selected
            }
            return v;
        });
    }

    const saved = (e) => {
        selected.comments = form.getFieldValue('desc');
        selected.cause = form.getFieldValue('cause');
        selected.severity = form.getFieldValue('action');
        selected.from = form.getFieldValue('mechine');

        axios.put('http://209.97.166.231:8080/posts/' + selected.id, selected).then((response) => {
            const value = update(posts, response.data);
            console.log(value)
            setPost(value);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setPost(filtered)
    }, [filtered])

    return (
        <Content className="site-layout-background" style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
        }}>
            <WrapContainer>
                <FormContent>
                    <HeaderContent>
                        <FormHeader>
                            <Select showSearch
                                placeholder="Select a mechine"
                                optionFilterProp="children"
                                onChange={handleOnChange}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={mechines}
                            />
                        </FormHeader>
                    </HeaderContent>
                    <InnerContent>
                        <Row>
                            <Col span={6}>
                                <HeaderList>
                                    <ButtonLabel>
                                        <Label>
                                            <img src={cevron} alt="back" />
                                            Back
                                        </Label>
                                    </ButtonLabel>
                                </HeaderList>
                                <GroupLabel>
                                    <ListGroup>
                                        <ListItem><Group>6 Alerts</Group></ListItem>
                                        <ListItem><Group><Highlight>2 New</Highlight></Group></ListItem>
                                    </ListGroup>
                                </GroupLabel>
                                <ListContainer>
                                    <InfiniteScroll
                                        dataLength={posts.length}
                                        hasMore={posts.length < 50}
                                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        <List dataSource={posts} renderItem={(item) => (
                                            <List.Item key={item.id} style={{ padding: '2px', width: '100%' }} onClick={() => onSelectedItem(item)}>
                                                <ListBody>
                                                    <IsNew>
                                                        {item.new && <Dot />}
                                                    </IsNew>
                                                    <MainItem>
                                                        <DetailID> ID #{item.sensor}</DetailID>
                                                        <DetailItem style={{ fontWeight: '600' }}>{findById(causes, item.cause)}</DetailItem>
                                                        <DetailItem>{toDate(item.detected)}</DetailItem>
                                                        <Description>{findById(mechines, item.from)}</Description>
                                                    </MainItem>
                                                    {
                                                        ItemSeverity(item.severity)
                                                    }
                                                </ListBody>
                                            </List.Item>
                                        )} />

                                    </InfiniteScroll>
                                </ListContainer>
                            </Col>
                            <Col span={18}>
                                <Row style={{ height: '410px' }}>
                                    <Col span={12}>
                                        {selected && <Waveform audio={sounds[selected.audio]} label="Anomaly Machine Output" style={{ width: '256px' }} />}
                                    </Col>
                                    <Col span={12}>
                                        {selected && <Waveform audio={sounds[selected.audio]} label="Normal Machine Output" style={{ width: '256px' }} />}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <InputForm>
                                            <Form form={form} layout="vertical" autoComplete="off">
                                                <Form.Item name="mechine" label="Equipment">
                                                    <Select options={mechines} placeholder="Select a mechine" optionFilterProp="children" />
                                                </Form.Item>
                                                <Form.Item name="cause" label="Suspected Reason">
                                                    <Select options={causes} placeholder="Select a Cause" optionFilterProp="children" />
                                                </Form.Item>
                                                <Form.Item name="action" label="Action Required">
                                                    <Select options={actions} placeholder="Select a Action" optionFilterProp="children" />
                                                </Form.Item>
                                                <Form.Item name="desc" label="Comments">
                                                    <TextArea rows={4} placeholder="please type a comment"></TextArea>
                                                </Form.Item>
                                                <Form.Item>
                                                    <ButtonContainer>
                                                        <Button onClick={saved}>Submit</Button>
                                                    </ButtonContainer>
                                                </Form.Item>
                                            </Form>
                                        </InputForm>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </InnerContent>
                </FormContent>
            </WrapContainer>
        </Content>
    )
}