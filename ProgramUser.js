import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import classnames from 'classnames';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardDeck,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Collapse,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Jumbotron,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    FormGroup,
    Label,
    Form,
    Alert,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardText,
    Toast,
    ToastHeader,
    ToastBody,
    InputGroupText,
    Badge,
    Fade,
    Pagination,
    PaginationItem,
    PaginationLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const Hei1000 = styled.div`
  @media screen and (max-width: 768px) {
    padding: 20px;
    height: auto;
  }
  @media screen and (min-width: 769px) {
    padding: 40px 30px;
    height: 500px;
  }
  overflow-x: auto;
`;
const RightButton = styled.div`
  position: relative;
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
`;
const WhiteSpace = styled.div`
  margin: 10px;
`;
const FlexBox = styled.div`
  display: flex;
`;
const Box = styled.div`
  border: 1.5px solid rgb(221, 221, 221);;
  border-radius: 7px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: white;
`;
const ProgramBox = styled.div`
  border: 1.5px solid #cecece;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  width: 45%;
  height: 200px;
  float: left;
`;
const ProgramBoxRight = styled.div`
  border: 1.5px solid #cecece;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  width: 45%;
  height: 200px;
  float: right;
`;
const UserBox = styled.div`
  border: 1.5px solid #cecece;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 43px;
  width: 45%;
  height: 230px;
  float: left;
`;
const UserBoxRight = styled.div`
  border: 1.5px solid #cecece;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 43px;
  width: 45%;
  height: 230px;
  float: right;
`;
const ListBox = styled.div`
  border: 1.5px solid rgb(221, 221, 221);;
  border-radius: 7px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: white;
  /*overflow: scroll;
  height: 450px;*/
`;

const ProgramUser = () => {
    axios.defaults.headers.common = { Accept: 'application/x-www-form-urlencoded, text/plain, \*/*' };

    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [type, setType] = useState(0);
    const [programdata, setProgramdata] = useState([]); //???????????? ????????? ?????? ??????
    const [programlistdata, setProgramlistdata] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [userlistdata, setUserlistdata] = useState([]);
    const [userprogramdata, setUserprogramdata] = useState([]);
    const [programtype, setProgramtype] = useState([]);
    const [state, setState] = useState({});
    const [searchstate, setSearchstate] = useState({});
    const [programId, setProgramId] = useState("");
    const [userId, setUserId] = useState("");
    const [availableProgram, setAvailableProgram] = useState([]);
    const [availableProgramList, setAvailableProgramList] = useState([]);

    const [a, setA] = useState(true);

    const [pmodal, setPmodal] = useState(false); //???????????? ?????? modal
    const [umodal, setUmodal] = useState(false); //????????? ?????? modal
    const [cmodal, setCmodal] = useState(false); //???????????? ?????? modal
    const [fmodal, setFmodal] = useState(false); //???????????? ?????? ?????? modal
    const [epmodal, setEpmodal] = useState(false); //???????????? ?????? modal
    const [dpmodal, setDpmodal] = useState(false); //???????????? ?????? modal

    /*???????????? ?????? ??????*/
    const [ptype, setPtype] = useState(-1); //???????????? ?????? ??????
    const [activeTab, setActiveTab] = useState('0');
    const toggleDrop = () => setDropdownOpen(prevState => !prevState);

    /*????????? ?????? ??????*/
    const [utype, setUtype] = useState(-1); //????????? ?????? ??????

    const tapToggle = async (tab) => {
        if (activeTab !== tab) await setActiveTab(tab);
    };

    let isOpen = () => {
        setOpen(!open);
    };

    /*?????? ???????????? ?????? ???????????? ??????*/
    let getProgramList = (e, t) => {
        setProgramlistdata([]);
        setPtype(t);

        if (t == -1) { //?????? ?????? ??????
            setProgramlistdata(programdata);
        }
        else { //???????????? ?????? ?????? ??????
            let list = [];
            programdata.map((data, i) => {
                if (data.program_type == t) {
                    list.push(data);
                }
            })
            setProgramlistdata(list);
        }
    }

    /*???????????? ?????? ??? ????????? ???????????? ????????? ????????????*/
    useEffect((e) => {
        getProgramList(e, ptype);
    }, [programdata])


    /*?????? ????????? ?????? ???????????? ??????*/
    let getUserList = (e, t) => {
        setUserlistdata([]);
        setUtype(t);

        if (t == -1) { //?????? ?????? ??????
            setUserlistdata(userdata);
        }
        else { //?????? ????????? or ?????? ????????? ?????? ??????
            let list = [];
            userdata.map((data, i) => {
                if (data.type === t) {
                    list.push(data);
                }
            })
            setUserlistdata(list);
        }
    }

    /*?????? ???*/
    let getUuid = () => {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (Math.random() * 16) | 0,
                v = 'x' ? r : r && 0x3 | 0x8;
            return v.toString(16).toUpperCase();
        });
    };

    /*Open ????????? ???????????? ????????? ???????????? ?????? ??????*/
    useEffect(() => {
        if (open === true) {
            getProgramdata();
            getUserdata();
            getProgramType();
        }
    }, [open]);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    /*Program or User ??????*/
    let changeType = (e, i) => {
        setType(i); //1=Program, 2=User
    }

    /*???????????? ????????? ???????????? ??????*/
    let getProgramdata = async () => {
        const response = await axios.post('API');
        setProgramdata(response.data.data.list);
        if (a === true) {
            setProgramlistdata(response.data.data.list);
            setA(false);
        }
    }

    /*????????? ????????? ???????????? ??????*/
    let getUserdata = async () => {
        const response = await axios.post('API');
        setUserdata(response.data.data.list);
        setUserlistdata(response.data.data.list);
    }

    //?????????????????? ???????????? ?????? ???????????? ?????? ex) ?????????, ??????
    let getProgramType = async () => {
        await axios.post('API')
            .then((response) => {
                setProgramtype(response.data.ProgramType);
            })
    }

    /*modal ??? ?????? ??????*/
    let xModal = (e) => {
        setPmodal(false);
        setUmodal(false);
        setCmodal(false);
        setFmodal(false);
        setEpmodal(false);
        setDpmodal(false);
    }

    /*??????????????? ?????? state?????? ???????????? ?????? ???????????? handler*/
    let onChangehandler = (e) => {
        let { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    /*?????? ????????? ???????????? state?????? ???????????? ?????? ???????????? handler*/
    let onChangeSearch = (e) => {
        let { name, value } = e.target;
        setSearchstate({
            ...searchstate,
            [name]: value,
        });
    }

    /*???????????? ?????? ?????? ??????*/
    let onSerachProgram = (e) => {
        const filterprogramlist = programdata.filter((data) => {
            console.log(data.program_title.toLowerCase().includes(searchstate.name));
            return data.program_title.toLowerCase().includes(searchstate.name);
        });
        setProgramlistdata(filterprogramlist);
    }

    /*????????? ?????? ?????? ??????*/
    let onSerachUser = (e) => {
        const filteruserlist = userdata.filter((data) => {
            console.log(data.adminId.toLowerCase().includes(searchstate.name));
            return data.adminId.toLowerCase().includes(searchstate.name);
        });
        setUserlistdata(filteruserlist);
    }

    /*?????? ????????? ???????????? ?????? ?????? ??????*/
    let onSerachAvailableProgram = (e) => {
        const filterprogramlist = availableProgram.filter((data) => {
            console.log(data.program_title.toLowerCase().includes(searchstate.name));
            return data.program_title.toLowerCase().includes(searchstate.name);
        });
        setAvailableProgramList(filterprogramlist);
    }

    /*???????????? ?????? toggle*/
    let onProgramSubmitToggle = (e) => {
        setPmodal(!pmodal);
        setState({
            ...state,
            "programId": getUuid()
        })
    }

    /*???????????? ?????? ??????*/
    let onProgramSubmit = async (e) => {
        let data = {
            "programId": state.programId,
            "program_type": Number(state.program_type),
            "stime": Number(new Date(state.stime).getTime() / 1000),
            "etime": Number(new Date(state.etime).getTime() / 1000),
            "program_title": state.program_title,
            "deleted": 0
        }

        await axios.post('API', JSON.stringify(data)).then((res) => {
            console.log(res);
            getProgramdata();
            xModal();
        });
    }

    /*????????? ?????? toggle*/
    let onUserSubmitToggle = (e) => {
        setUmodal(!umodal);
    }

    /*????????? ?????? ??????*/
    let onUserSubmit = async (e) => {
        let data = {
            "id": state.id,
            "pw": state.pw,
            "type": Number(state.type),
            "activate": Number(new Date(state.activate).getTime() / 1000)
        }

        await axios.post('API', JSON.stringify(data)).then((res) => {
            console.log(res);
            getUserdata();
            xModal();
        });
    }

    /*?????? ????????? ???????????? ????????? ???????????? ??????*/
    let onAvailableProgram = async (adminId) => {
        let data = {
            "adminId": adminId,
        }
        setUserId(adminId);

        await axios.post('API', JSON.stringify(data)).then((res) => {
            console.log(res);
            setAvailableProgram(res.data.data.list);
            setAvailableProgramList(res.data.data.list);
        });
    }

    /*???????????? ?????? toggle*/
    let connectProgramToggle = (e, data) => {
        setAvailableProgramList([]);
        setCmodal(!cmodal);
        onAvailableProgram(data);

    }

    /*???????????? ?????? ??????*/
    let connectProgram = async (e) => {
        let data = {
            "id": userId,
            "programId": programId,
            "headcount": Number(state.headcount)
        }

        await axios.post('API', JSON.stringify(data)).then((res) => {
            console.log(res);
            xModal();
        });
    }

    /*????????? ???????????? ID ???????????? ??????*/
    let storeProgramId = (e, data) => {
        setProgramId(data);
    }

    /*????????? ???????????? ?????? toggle */
    let checkProgramToggle = async (e, data) => {
        setFmodal(!fmodal);

        await axios.post('API', JSON.stringify({ "adminId": data })).then((res) => {
            console.log(res);
            setUserprogramdata(res.data.data.list);
        });
    }

    /*???????????? ?????? toggle*/
    let editProgramToggle = (e, data) => {
        setEpmodal(!epmodal);
        setState({
            "programId": data.programId,
            "program_type": data.program_type,
            "stime": new Date(data.stime * 1000).toISOString().split('T')[0],
            "etime": new Date(data.etime * 1000).toISOString().split('T')[0],
            "program_title": data.program_title,
            "deleted": data.deleted
        })
    }

    /*???????????? ?????? ??????*/
    let editProgram = async (e) => {
        let data = {
            "programId": state.programId,
            "program_type": Number(state.program_type),
            "stime": Number(new Date(state.stime).getTime() / 1000),
            "etime": Number(new Date(state.etime).getTime() / 1000),
            "program_title": state.program_title,
            "deleted": state.deleted
        }
        await axios.post('API', JSON.stringify(data)).then((res) => {
            console.log(res);
            getProgramdata();
            xModal();
        });
    }

    /*???????????? ?????? toggle*/
    let deleteProgramToggle = (e, data) => {
        setDpmodal(!dpmodal);
        //??????
        if (data.deleted === 1) {
            setState({
                "programId": data.programId,
                "program_type": data.program_type,
                "stime": data.stime,
                "etime": data.etime,
                "program_title": data.program_title,
                "deleted": 0
            })

        }
        //?????? ??????
        else if (data.deleted === 0) {
            setState({
                "programId": data.programId,
                "program_type": data.program_type,
                "stime": data.stime,
                "etime": data.etime,
                "program_title": data.program_title,
                "deleted": 1
            })

        }
    }

    /*???????????? ?????? ??????*/
    let deleteProgram = async (e) => {
        let data;
        //??????
        if (state.deleted === 1) {
            data = {
                "programId": state.programId,
                "program_type": Number(state.program_type),
                "stime": state.stime,
                "etime": state.etime,
                "program_title": state.program_title,
                "deleted": 1
            }
        }
        //?????? ??????
        else if (state.deleted === 0) {
            data = {
                "programId": state.programId,
                "program_type": Number(state.program_type),
                "stime": state.stime,
                "etime": state.etime,
                "program_title": state.program_title,
                "deleted": 0
            }
        }

        await axios.post('API', JSON.stringify(data)).then((res) => {
            console.log(res);
            getProgramdata();
            xModal();
        });
    }

    return (
        <Card>
            <CardHeader>
                <FlexBox>
                    ProgramUser{' '}
                    <RightButton>
                        <Button onClick={(e) => isOpen()}>OPEN</Button>
                    </RightButton>
                </FlexBox>
            </CardHeader>
            <Collapse isOpen={open}>
                <CardBody >
                    <Hei1000 style={{ height: "1000px" }}>
                        <Row>
                            <Col>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink onClick={(e) => {
                                            changeType(e, 1);
                                        }}>Program</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={(e) => {
                                            changeType(e, 2);
                                        }}>User</NavLink>
                                    </NavItem>
                                </Nav>

                                {/*Program*/}
                                {type === 1 ?
                                    <div>
                                        <Button className="programUserbutton" color="primary" onClick={(e) => onProgramSubmitToggle(e)}>???????????? ??????</Button>
                                        <Nav tabs>
                                            <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                                                <DropdownToggle style={{ width: "125px" }} className="programlist" caret>???????????? ??????</DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>???????????? ??????</DropdownItem>
                                                    <div style={{ height: '220px', overflow: 'auto' }} >
                                                        <DropdownItem className={classnames({
                                                            active: activeTab === (0).toString(),
                                                        })}
                                                            onClick={(e) => {
                                                                tapToggle((0).toString());
                                                                getProgramList(e, -1);
                                                            }}>??????</DropdownItem>
                                                        <DropdownItem divider />
                                                        {programtype.map((data, i) => {
                                                            return (
                                                                <DropdownItem key={i} className={classnames({
                                                                    active: activeTab === (i + 1).toString(),
                                                                })}
                                                                    onClick={(e) => {
                                                                        tapToggle((i + 1).toString());
                                                                        getProgramList(e, data.program_type);
                                                                    }}>
                                                                    {programtype[i].program_explan}
                                                                </DropdownItem>
                                                            );
                                                        })}
                                                    </div>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </Nav>
                                        <button className="searchbt" onClick={(e) => onSerachProgram(e)}>??????</button>
                                        <input className="search" type="text" name="name" onChange={(e) => onChangeSearch(e)} />

                                        {ptype === -1 ? <div className="programUsertitle">???????????? ?????? - ??????</div> : programtype.map((data, i) => {
                                            if (ptype === data.program_type) {
                                                return <div key={i} className="programUsertitle">???????????? ?????? - {data.program_explan}</div>
                                            }
                                        })}
                                        <div>{programlistdata.map((data, i) => {
                                            if (i % 2 === 1) {

                                                return (<ProgramBoxRight key={i}>
                                                    {data.deleted === 1 ? <span style={{ color: "red", fontFamily: "Jua", float: "right", marginRight: "3%" }}>??????</span> : ""}
                                                    <div className="ptype1">??????: <span>{data.program_title}</span></div>
                                                    <p className="ptype">???????????? ??????: <span>{data.program_type === 1 ? <span>?????????</span> : data.program_type === 2 ? "??????" : " "}</span></p>
                                                    <p className="ptype">?????? ??????: <span className="ptype4">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>

                                                    <div className="ubtbox">
                                                        <button className="pdbutton" onClick={(e) => editProgramToggle(e, data)}>??????</button>
                                                        {data.deleted === 1 ? <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>????????????</button> : <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>??????</button>}

                                                    </div>

                                                </ProgramBoxRight>
                                                )
                                            }
                                            else {
                                                return <ProgramBox key={i}>
                                                    {data.deleted === 1 ? <span style={{ color: "red", fontFamily: "Jua", float: "right", marginRight: "3%" }}>??????</span> : ""}
                                                    <div className="ptype1">??????: <span>{data.program_title}</span></div>
                                                    <p className="ptype">???????????? ??????: <span>{data.program_type === 1 ? <span>?????????</span> : data.program_type === 2 ? "??????" : " "}</span></p>
                                                    <p className="ptype">?????? ??????: <span className="ptype4">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>

                                                    <div className="ubtbox">
                                                        <button className="pdbutton" onClick={(e) => editProgramToggle(e, data)}>??????</button>
                                                        {data.deleted === 1 ? <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>????????????</button> : <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>??????</button>}
                                                    </div>
                                                </ProgramBox>
                                            }
                                        }
                                        )}
                                        </div>
                                    </div>

                                    /*User*/
                                    : type === 2 ?
                                        <div>
                                            <Button className="programUserbutton" color="primary" onClick={(e) => onUserSubmitToggle(e)}>User ??????</Button>
                                            <Nav tabs>
                                                <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                                                    <DropdownToggle style={{ width: "125px" }} className="programlist" caret>????????? ??????</DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem header>????????? ??????</DropdownItem>
                                                        <div style={{ height: '220px', overflow: 'auto' }} >
                                                            <DropdownItem onClick={(e) => {
                                                                getUserList(e, -1);
                                                            }}>??????</DropdownItem>
                                                            <DropdownItem divider />
                                                            <DropdownItem onClick={(e) => {
                                                                getUserList(e, 1);
                                                            }}>?????? ?????????</DropdownItem>
                                                            <DropdownItem onClick={(e) => {
                                                                getUserList(e, 0);
                                                            }}>?????? ?????????</DropdownItem>
                                                        </div>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </Nav>
                                            <button className="searchbt" onClick={(e) => onSerachUser(e)}>??????</button>
                                            <input className="search" type="text" name="name" onChange={(e) => onChangeSearch(e)} />
                                            {utype === -1 ? <div className="programUsertitle">????????? ?????? - ??????</div> : utype === 1 ? <div className="programUsertitle">????????? ?????? - ?????? ?????????</div> : utype === 0 ? <div className="programUsertitle">????????? ?????? - ?????? ?????????</div> : ""}

                                            <div>{userlistdata.map((data, i) => {
                                                if (i % 2 === 1) {
                                                    return <UserBoxRight key={i}>
                                                       {data.type === 1 ? <span className="admin">?????? ?????????</span> : data.type === 0 ? <span className="oadmin">?????? ?????????</span> : ""}
                                                        <p className="utype1"><span className="adid">ID</span><span className="idv">{data.adminId}</span></p>
                                                        <p className="utype"><span className="adpw">PW</span><span className="pwv">{data.adminPW}</span></p>

                                                        <p className="utype2">?????? ?????? ?????? <span className="ptye3">{new Date(data.activate * 1000).toISOString().split('T')[0]}</span></p>

                                                        <div className="ubtbox">
                                                            <button className="pdbutton" onClick={(e) => connectProgramToggle(e, data.adminId)}>???????????? ??????</button>
                                                            <button className="pdbutton1" onClick={(e) => checkProgramToggle(e, data.adminId)}>???????????? ??????</button>
                                                        </div>
                                                    </UserBoxRight>
                                                }
                                                else {
                                                    return <UserBox key={i}>
                                                        {data.type === 1 ? <span className="admin">?????? ?????????</span> : data.type === 0 ? <span className="oadmin">?????? ?????????</span> : ""}
                                                        <p className="utype1"><span className="adid">ID</span><span className="idv">{data.adminId}</span></p>
                                                        <p className="utype"><span className="adpw">PW</span><span className="pwv">{data.adminPW}</span></p>


                                                        <p className="utype2">?????? ?????? ?????? <span className="ptye3">{new Date(data.activate * 1000).toISOString().split('T')[0]}</span></p>

                                                        <div className="ubtbox">
                                                            <button className="pdbutton" onClick={(e) => connectProgramToggle(e, data.adminId)}>???????????? ??????</button>
                                                            <button className="pdbutton1" onClick={(e) => checkProgramToggle(e, data.adminId)}>???????????? ??????</button>
                                                        </div>
                                                    </UserBox>
                                                }
                                            }
                                            )}
                                            </div>
                                        </div>
                                        : ""}

                                {/*???????????? ?????? Modal*/}
                                <Modal isOpen={pmodal}>
                                    <ModalHeader><span className="dmodalheader">???????????? ??????</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">???????????? ??????</p>
                                            <Input type="text" name="program_title" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">???????????? ??????</p>
                                            <Input type="select" name="program_type" onChange={(e) => onChangehandler(e)}>
                                                <option>??????????????????.</option>
                                                <option value='1'>?????????</option>
                                                <option value='2'>??????</option>
                                            </Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">?????? ??????</p>
                                            <Input type="date" name="stime" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">?????? ??????</p>
                                            <Input type="date" name="etime" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >??????</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => onProgramSubmit(e)}>??????</Button>
                                        </div>
                                        
                                    </ModalBody>
                                </Modal>

                                {/*????????? ?????? Modal*/}
                                <Modal isOpen={umodal}>
                                    <ModalHeader><span className="dmodalheader">????????? ??????</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">????????? ID</p>
                                            <Input type="text" name="id" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">????????? PASSWORD</p>
                                            <Input type="text" name="pw" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">????????? ??????</p>
                                            <Input type="select" name="type" onChange={(e) => onChangehandler(e)}>
                                                <option disabled> </option>
                                                <option value='1'>?????? ?????????</option>
                                                <option value='0'>?????? ?????????</option></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">?????? ?????? ??????</p>
                                            <Input type="date" name="activate" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >??????</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => onUserSubmit(e)}>??????</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*???????????? ?????? Modal*/}
                                <Modal isOpen={cmodal}>
                                    <ModalHeader><span className="dmodalheader">????????????-????????? ??????</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">?????? ????????? ???</p>
                                            <Input type="text" name="headcount" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <ListBox>
                                            <p className="attr">???????????? ?????????</p>
                                            <button className="searchbt1" onClick={(e) => onSerachAvailableProgram(e)}>??????</button>
                                            <InputGroup style={{ width: "380px", marginBottom: "10px" }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>??????</InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="inputserach" type="text" name="name" onChange={(e) => onChangeSearch(e)} />
                                            </InputGroup>
                                            {programtype.map((protype, j) => {
                                                return (
                                                    <div key={j}><p className="listp2">{protype.program_explan} ?????????</p>
                                                        {availableProgramList.map((data, i) =>
                                                            (
                                                                <div key={i}>
                                                                    <div>{data.program_type === protype.program_type ? <div>
                                                                        {data.adminId === null && data.deleted === 0 ? <div><button className="programlistbtnull" key={i} onClick={(e) => storeProgramId(e, data.programId)}>
                                                                            <p className="attrname">{data.program_title}</p>

                                                                            <p style={{ fontFamily: "Jua" }}>??????  <span className="ptype3">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>
                                                                        </button></div> : data.deleted === 0 ? <div><button className="programlistbt" key={i} onClick={(e) => storeProgramId(e, data.programId)} disabled>
                                                                            <p className="attrname">{data.program_title}</p>
                                                                            <p style={{ fontFamily: "Jua" }}>??????  <span className="ptype3">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>
                                                                        </button></div> : ""}</div> : ""}</div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                )
                                            }
                                            )}
                                        </ListBox>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >??????</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => connectProgram(e)}>??????</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*???????????? ?????? ?????? Modal*/}
                                <Modal isOpen={fmodal}>
                                    <ModalHeader><span className="dmodalheader">????????? ???????????? ??????</span></ModalHeader>
                                    <ModalBody>
                                        <div>{userprogramdata.map((data, i) => {
                                            return (
                                                programdata.map((pd, j) => (

                                                    <div key={j}>
                                                        {data.deleted === 0 && pd.programId === data.programId ?
                                                            <div className="attdiv">
                                                                <p className="attrname1">???????????? ?????? : {pd.program_type === 1 ? "?????????" : "??????"}</p>
                                                                <p className="attrname1">???????????? ?????? : {pd.program_title}</p>
                                                                <p className="attrname1">?????? ???: {data.headcount}???</p>

                                                            </div> : ""}
                                                    </div>
                                                )
                                                )
                                            )
                                        })}</div>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >??????</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*???????????? ?????? Modal*/}
                                <Modal isOpen={epmodal}>
                                    <ModalHeader><span className="dmodalheader">???????????? ??????</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">???????????? ??????</p>
                                            <Input type="text" name="program_title" onChange={(e) => onChangehandler(e)} value={state.program_title}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">???????????? ??????</p>
                                            <Input type="select" name="program_type" onChange={(e) => onChangehandler(e)} value={state.program_type}>
                                                <option>??????????????????.</option>
                                                <option value='1'>?????????</option>
                                                <option value='2'>??????</option>
                                            </Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">?????? ??????</p>
                                            <Input type="date" name="stime" onChange={(e) => onChangehandler(e)} value={state.stime}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">?????? ??????</p>
                                            <Input type="date" name="etime" onChange={(e) => onChangehandler(e)} value={state.etime}></Input>
                                        </Box>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >??????</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => editProgram(e)}>??????</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*???????????? ?????? modal*/}
                                <Modal isOpen={dpmodal}>
                                    <ModalHeader>{state.deleted === 0 ? <span className="dmodalheader">???????????? ?????? ??????</span> : <span className="dmodalheader">???????????? ??????</span>}</ModalHeader>
                                    <ModalBody>
                                        {state.deleted === 0 ? <p className="dmodalbody">?????? ??????????????? ?????? ???????????? ???????????????????</p> : <p className="dmodalbody">?????? ??????????????? ?????? ?????????????????????????</p>}

                                        <div className="deletesurveyBtn">
                                            <Button style={{ marginRight: "5px" }} color="primary" onClick={(e) => deleteProgram(e)}>Yes</Button>
                                            <Button color="secondary" onClick={(e) => xModal()} >No</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                            </Col>
                        </Row>
                    </Hei1000>
                </CardBody>
            </Collapse>
        </Card>
    );
};

export default ProgramUser;