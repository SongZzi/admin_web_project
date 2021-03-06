import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import classnames from 'classnames';
import '../App.css';
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
import { render } from '@testing-library/react';
import { undef } from '@redux-saga/is';

const Ggs = styled.div`
  padding: 1rem 1rem;
`;
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
const Hei = styled.div`
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
const BottomLine = styled.div`
  height:auto;
  border-bottom:3px solid rgb(100,180,200);
  margin-bottom:2%;
`
const Box = styled.div`
  border: 1.5px solid rgb(221, 221, 221);;
  border-radius: 7px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: white;
`;
const Bt = styled.div`
  float: right;
  `;

const Survey = () => {

  axios.defaults.headers.common = { Accept: 'application/x-www-form-urlencoded, text/plain, \*/*' };

  const [open, setOpen] = useState(false);

  const [state, setState] = useState([]);
  const [updateState, setUpdatestate] = useState(false);
  const [delqstate, setDelqstate] = useState([]);
  const [sinput, setSinput] = useState({});
  const [qinput, setQinput] = useState({});

  const [surveySelect, setsurveySelect] = useState([]); //????????? ??????
  const [surveyQuestion, setsurveyQuestion] = useState([]); //????????? ??????
  const [questiondata, setQuestiondata] = useState('0'); //question_id ??????

  const [activeTab, setActiveTab] = useState('0');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeQ, setFadeQ] = useState(true);

  const [arr, setArr] = useState([0,]); //?????????, ????????? question_choice ???
  const [typenum, setTypenum] = useState([]);
  const [tmp, setTmp] = useState([]);

  const [modal, setModal] = useState(false); //?????? ?????? modal
  const [smodal, setSmodal] = useState(false); //?????? ?????? modal
  const [qmodal, setQmodal] = useState(false); //?????? ?????? modal
  const [sDmodal, setSDmodal] = useState(false); //?????? ?????? modal
  const [qDmodal, setQdmodal] = useState(false); //?????? ?????? modal

  let isOpen = () => {
    setOpen(!open);
  };

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const toggleInput = () => setSmodal(!smodal);

  const fadeToggle = () => setFadeIn(!fadeIn);

  const fadeQtoggle = () => setFadeQ(!fadeQ);

  const tapToggle = async (tab) => {
    if (activeTab !== tab) await setActiveTab(tab);
  };

  /*?????? ?????? toggle*/
  const toggleQuestion = (data, e) => {
    setQmodal(!qmodal);
    setState({
      "survey_id": data.survey_id,
      "type1": 1,
    })
    setArr([0,]);
  }

  /*?????? ?????? X?????? ????????? ???????????? ??????*/
  const toggleSurvey = (e) => {
    setSDmodal(!sDmodal);
  }

  /*?????? ?????? toggle*/
  const toggleDeleteSurvey = (data, e) => {
    setSDmodal(true);
    setState({
      survey_id: data.survey_id,
      program_type: data.program_type,
      creator: data.creator,
      title: data.title,
      survey_delete: 1,
    })
  }

  /*????????? ????????? ???????????? ??????*/
  let get = async () => {
    const response = await axios.post('API');
    setsurveySelect(response.data.survey);
  }

  /*????????? ID??? state??? ???????????? ??????*/
  let getQuest = async (id) => {
    setQuestiondata(id);
    console.log(id);
    setState({
      survey_id: id
    })
  }

  /*????????? ????????? ?????? ????????? ????????? ???????????? ?????? ??????*/
  useEffect(() => {
    if (questiondata !== '0') {
      getQuestion();
    }
  }, [questiondata])

  /*????????? id??? ?????? ????????? ????????? ???????????? ??????*/
  let getQuestion = async () => {
    let parameter;
    parameter = { surveyid: questiondata }

    axios.post('API', JSON.stringify(parameter))
      .then((res) => {
        setsurveyQuestion(res.data.question);
      })
  }

  /*Modal??? ?????? ??????*/
  let xModal = () => {
    setModal(false);
    setQmodal(false);
    setSDmodal(false);
    setQdmodal(false);
    setSmodal(false);
  }

  /*??????????????? ?????? state?????? ???????????? ?????? ???????????? handler*/
  let onChangehandler = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  /*????????? ??? ????????? question_choice ???????????? ??????*/
  let typenumhandler = (e) => {
    let { name, value } = e.target;

    typenum.splice(name.replace("typenum", ""), 1, value);
    console.log("typenum", typenum);
    setState({
      ...state,
      "question_choice": JSON.stringify(typenum),
    })
  }

  /*??????*/
  let getTime = (time) => {
    let date = new Date(time * 1000 + 3600 * 9 * 1000).toISOString();
    return date;
  }

  /*Open ????????? ????????? ????????? ???????????? ?????? ??????*/
  useEffect(() => {
    if (open === true) {
      get();
    }
  }, [open]);

  /*?????? ???*/
  let getUuid = () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = 'x' ? r : r && 0x3 | 0x8;
      return v.toString(16).toUpperCase();
    });
  };

  /*?????? ?????? ??????*/
  let onSubmit = async () => {
    if (sinput.program_type === undefined || sinput.title === undefined) {
      alert("?????? ?????? ??????????????????");
    }

    //insert survey
    let data1 = {
      survey_id: getUuid(),
      program_type: Number(sinput.program_type),
      creator: sessionStorage.getItem('id'),
      title: sinput.title,
      survey_delete: 0,
    }
    axios.post('API', JSON.stringify(data1))
      .then((res) => {
        console.log(res);
        xModal();
        get();
      })
  };

  let onQsubmit = async () => {

    let choiceStr = [];
    for (let i = 0; i < state.type1; i++) {
      choiceStr.push(state['typenum' + i])
    }
  }

  /*??????????????? ?????? state?????? ???????????? ?????? ???????????? handler*/
  let jonChangehandler = (e) => {
    let { name, value } = e.target;

    setSinput({
      ...sinput,
      [name]: value,
    });

  };

  /*?????? ?????? ??????*/
  let deleteSurvey = (e) => {
    let data5 = {
      survey_id: state.survey_id,
      program_type: state.program_type,
      creator: state.creator,
      title: state.title,
      survey_delete: 1,
    }

    axios.post('API', JSON.stringify(data5))
      .then((res) => {
        console.log(res);
        xModal();
        get();
      })
  };

  /*?????? ?????? + ??????*/
  let onAddNumsubmit = async (e) => {
    let tmp = [];
    for (let i = 0; i < state.type1; i++) {
      tmp.push("");
    }
    setArr(tmp)
  }

  /*?????? ?????? ??????*/
  let onSubmitQuestion = async (e) => {
    //insert question

    //???????????? ??????
    let value = true;
    console.log(state.type1);
    console.log(state['typenum0']);
    if (state.question_type === 1 || state.question_type === '1' || state.question_type === 4 || state.question_type === '4') {
      for (let i = 0; i < state.type1; i++) {
        console.log(state['typenum' + i]);
        if (state['typenum' + i] === undefined || state['typenum' + i] === "") {
          value = false;
        }
      }
    }
    console.log(value);
    if (state.question_txt === undefined || state.question_type === undefined || value === false || state.isDual === undefined || state.answer_type === undefined) {
      alert("?????? ?????? ??????????????????");
    }
    else {

      let choiceStr = [];
      if (state.question_type === 1 || state.question_type === '1' || state.question_type === 4 || state.question_type === '4') {
        for (let i = 0; i < state.type1; i++) {
          choiceStr.push(state['typenum' + i])
        }
      }

      if ((state.question_type === 1 || state.question_type === '1') && choiceStr.length < 2) {
        alert("????????? ?????? ?????? ??????????????? ?????????.");
      }
      else {
        console.log("state", state);
        console.log("choiceStr", choiceStr);
        let id = getUuid();

        let arr = surveyQuestion;

        let max = 0;
        for (let i = 0; i < surveyQuestion.length; i++) {
          if (arr[i].question_seq > max) {
            max = arr[i].question_seq;
          }
        }

        let data3 = {
          survey_id: state.survey_id,
          creator: sessionStorage.getItem('id'),
          question_id: id,
          question_txt: state.question_txt,
          question_choice: JSON.stringify(choiceStr),
          isDual: Number(state.isDual),
          question_type: Number(state.question_type),
          question_seq: max + 1,
          answer_type: Number(state.answer_type),
          question_delete: 0
        }
        axios.post('API', JSON.stringify(data3))
          .then((res) => {
            console.log(res);
            let data4 = {
              answer_type: state.answer_type,
              creator: sessionStorage.getItem('id'),
              question_choice: JSON.stringify(choiceStr),
              question_id: id,
              quesion_seq: max + 1,
              question_txt: state.question_txt,
              question_type: Number(state.question_type),
              survey_id: state.survey_id,
              timestamp: new Date(),
            }

            surveyQuestion[surveyQuestion.length] = data4;
            xModal();
            getQuestion();
          })

        console.log(surveyQuestion);
      }
    }
  }

  /*?????? ?????? + ??????*/
  let onNumsubmit = async (e) => {
    setTypenum([]);
    let tmp = JSON.parse(state.question_choice);
    //let tmp = JSON.parse(typenum);
    tmp.push("");

    setState({ ...state, "question_choice": JSON.stringify(tmp), "type1": Number(tmp.length) });
    setTypenum(tmp);
    console.log(tmp);
  }
  /*?????? ?????? - ??????*/
  let onNumsubmit1 = async (e) => {
    let tmp = JSON.parse(state.question_choice);
    //let tmp = JSON.parse(typenum);
    setTypenum([]);
    tmp.splice(JSON.parse(state.question_choice).length - 1, 1);
    setState({ ...state, "question_choice": JSON.stringify(tmp), "type1": Number(tmp.length) });
    setTypenum(tmp);
  }

  /*?????? ?????? toggle*/
  let modifyToggle = (data, e) => {
    setModal(!modal);
    if (data.question_type !== 1) {
      setTypenum([]);
    }

    setState({
      "type1": JSON.parse(data.question_choice).length,
      "survey_id": data.survey_id,
      "question_id": data.question_id,
      "question_txt": data.question_txt,
      "question_choice": data.question_choice,
      "isDual": data.isDual,
      "question_type": data.question_type,
      "question_seq": data.question_seq,
      "answer_type": data.answer_type,
      "creator": data.creator,
      "timestamp": new Date(),
    })
    setTypenum(JSON.parse(data.question_choice))
  }

  /*?????? ?????? ??????*/
  let modifyPost = async () => {

    let choiceStr = [];
    choiceStr = typenum;

    setUpdatestate(true);
    surveyQuestion.map((data, i) => {
      if (data.question_id === state.question_id) {
        surveyQuestion[i] = state;
        xModal();
      }
    })

    surveySelect.map((data, i) => (
      data.survey_id === state.survey_id ? setState({ ...state, "program_type": data.program_type, "title": data.title, }) : ""
    ))
    let data2 = {
      survey_id: state.survey_id,
      creator: state.creator,
      question_id: state.question_id,
      question_txt: state.question_txt,
      question_choice: JSON.stringify(choiceStr),
      isDual: Number(state.isDual),
      question_type: Number(state.question_type),
      question_seq: Number(state.question_seq),
      answer_type: Number(state.answer_type),
      question_delete: 0
    }
    await axios.post('API', JSON.stringify(data2)).then((res) => { console.log(res) });
    getQuestion();

  }

  /*?????? ?????? toggle*/
  let questionDeleteToggle = (data, e) => {

    setQdmodal(!qDmodal)
    setDelqstate({
      "survey_id": data.survey_id,
      "creator": data.creator,
      "question_id": data.question_id,
      "question_txt": data.question_txt,
      "question_choice": data.question_choice,
      "isDual": data.isDual,
      "question_type": data.question_type,
      "question_seq": data.question_seq,
      "answer_type": data.answer_type,
      "qeustion_delete": 1,
    })
  };

  /*?????? ?????? ??????*/
  let questionDelete = async (e) => {

    let deleteData = {
      survey_id: delqstate.survey_id,
      creator: delqstate.creator,
      question_id: delqstate.question_id,
      question_txt: delqstate.question_txt,
      question_choice: delqstate.question_choice,
      isDual: delqstate.isDual,
      question_type: delqstate.question_type,
      question_seq: delqstate.question_seq,
      answer_type: delqstate.answer_type,
      question_delete: Number(1),
    }
    await axios.post('API', JSON.stringify(deleteData))
      .then((res) => {
        console.log(res);
        xModal();
        getQuestion();
      });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <FlexBox>
            Survey{' '}
            <RightButton>
              <Button onClick={(e) => isOpen()}>OPEN</Button>
            </RightButton>
          </FlexBox>
        </CardHeader>
        <Collapse isOpen={open}>

          <Card style={questiondata === "0" ? { paddingBottom: "35%" } : { paddingBottom: "20%" }} >
            <CardBody>
              <Row>
                <Col lg="12">
                  <Nav tabs>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle className="surveylist" caret>
                        ????????? ?????????
        </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>????????? ?????????</DropdownItem>
                        <div style={{ height: '220px', overflow: 'auto' }} >
                          {surveySelect.map((data, i) => {

                            return (
                              <DropdownItem key={i} className={classnames({
                                active: activeTab === (i + 1).toString(),
                              })}
                                onClick={(e) => {
                                  tapToggle((i + 1).toString());
                                  getQuest(data.survey_id);
                                }}>
                                {surveySelect[i].title}
                              </DropdownItem>
                            );
                          })}
                        </div>
                      </DropdownMenu>
                    </Dropdown>

                    <div className="asbtn"><button className="addsurvey" onClick={toggleInput} color="primary">????????????</button></div>
                    {/*????????? ?????? ??????*/}
                    <div className="addsurveyBtn">

                      <Modal isOpen={smodal} toggle={toggleInput}>
                        <ModalHeader><span className="insertsurveyform">?????? ??????</span></ModalHeader>
                        <ModalBody>

                          <Box>
                            <p className="t">???????????? ??????</p>
                            <Input type="select" name="program_type" onChange={(e) => jonChangehandler(e)}>
                              <option>??????????????????.</option>
                              <option value='1'>?????????</option>
                              <option value='2'>??????</option>
                            </Input>
                          </Box>

                          <Box>
                            <p className="t">????????? ??????</p>
                            <Input type="text" name="title" onChange={(e) => jonChangehandler(e)}></Input>{/*</InputGroup>*/}
                          </Box>
                          <div className="submitBt" ><Button style={{fontFamily: 'Jua'}} type="submit" color="secondary" onClick={(e) => xModal(e)}>??????</Button></div>
                          <div className="submitBt" ><Button style={{fontFamily: 'Jua'}} type="submit" color="primary" onClick={(e) => onSubmit(e)}>??????</Button></div>

                        </ModalBody>
                      </Modal>
                    </div>

                  </Nav>
                  {surveySelect.map((datafirst, i) => {
                    return (
                      <TabContent activeTab={activeTab} key={i}>
                        <TabPane tabId={(i + 1).toString()}>

                          <button className="details" onClick={fadeToggle}>Details</button>

                          {/*????????? ?????? ??????, ????????? ?????? ?????? deleteSurvey(datafirst, e)*/}

                          <button className="deleteBtn" onClick={(e) => toggleDeleteSurvey(datafirst, e)} >?????? ??????</button>
                          <button className="addquestionBtn" onClick={(e) => toggleQuestion(datafirst, e)} color="primary">?????? ??????</button>

                          <Fade in={fadeIn} tag="h6" className="mt-3">
                            <div className="surveytitle">{surveySelect[i].title}</div>
                            <Row>

                              <Card body className="card1">
                                <Col >
                                  <CardTitle className="cardtitle1" tag="h6">?????????</CardTitle>
                                  <CardText className="cardtext1">{surveySelect[i].creator}</CardText>
                                </Col>
                              </Card>
                              <Card body className="card2">
                                <Col >
                                  <CardTitle className="cardtitle2" tag="h6">????????? ??????</CardTitle>
                                  <CardText className="cardtext2">

                                    {surveySelect[i].program_type === 1 ? (
                                      "???????????? ?????? ???????????????."
                                    ) : (
                                        "????????? ?????? ???????????????."
                                      )}
                                  </CardText>
                                </Col>
                              </Card>
                              <Card body className="card3">
                                <Col >
                                  <CardTitle className="cardtitle3" tag="h6">?????? ??????</CardTitle>
                                  <CardText className="cardtext3">
                                    {getTime(surveySelect[i].timestamp).substr(0, 10)}
                                    &nbsp;&nbsp;
                                      {getTime(surveySelect[i].timestamp).substr(11, 18).replace(".000Z", "")}
                                  </CardText>
                                </Col>
                              </Card>
                            </Row>
                          </Fade>

                          <Row >
                            <Col lg="12">
                              <Card className="cardbody" body outline color="link">

                                <div className="questions">??????</div>
                                {/*question??? ????????? ???????????? ????????? Qestion??? map????????? ????????? ??????*/}
                                {/*<Fade in={fadeQ} tag="h6" className="mt-3">*/}
                                {surveyQuestion.map((data, i) => (
                                  <div className="questionlist" tag="h6" color="info" key={i}>

                                    <div className="bagefirst"><span className="bagenum"><Badge color="secondary">{i + 1}</Badge></span><span className="bageinfo"><Badge color="light">{data.question_type === 1 ? '?????????' : data.question_type === 2 ? "?????????" : data.question_type === 3 ? "O/X" : data.question_type === 4 ? "?????????" : "null"}</Badge><Badge color="light">{data.answer_type === 1 ? "??????" : data.answer_type === 2 ? "??????" : data.answer_type === 3 ? "?????? ??????" : data.answer_type === 4 ? "O/X" : "null"}</Badge></span></div>

                                    <div className="questionInfo">
                                      <div className="questionTitle">{data.question_txt}</div>
                                      <Row>
                                        {JSON.parse(data.question_choice).map((data2, i) => (
                                          <div key={i}>{data.question_type === 4 && i === 0 ? <Col key={i} className="questCol" xs="auto" >
                                            <div className="questChoicevalueboss1"><div className="questChoicevalue1">{data2}</div></div>
                                          </Col> : data.question_type === 4 && i !== 0 ? <Col key={i} className="questCol" xs="auto" >
                                            <div className="questChoicevalueboss2"><div className="questChoicevalue2">{data2}</div></div>
                                          </Col> : data.question_type === 1 ? <Col key={i} className="questCol" xs="auto" >
                                            <div className="questChoicevalueboss"><div className="questChoicenum">{i + 1}</div><div className="questChoicevalue">{data2}</div></div>
                                          </Col> : ""}</div>
                                        ))}
                                      </Row>
                                      {data.question_type === 2 ? <div className="ju">?????????</div> : data.question_type === 3 ? <div><div className="o"><input type="radio" disabled></input> O</div><div className="x"><input type="radio" disabled></input> X</div></div> : ""}
                                    </div>
                                    <button style={{fontFamily: 'Jua'}} className="deleteqBtn" onClick={(e) => questionDeleteToggle(data, e)} >??????</button>
                                    <button style={{fontFamily: 'Jua'}} className="modifyqBtn" onClick={(e) => modifyToggle(data, e)} >??????</button>
                                  </div>
                                ))}
                                {/*</Fade>*/}
                                {modal === true ? <Modal isOpen={modal}  >
                                  <ModalHeader  ><div className="questionmodify">?????? ??????</div></ModalHeader>
                                  <ModalBody>
                                    <Box>
                                      <p className="t">?????? ??????</p>
                                      <Input type="text" name="question_txt" id="questiontextID" onChange={(e) => onChangehandler(e)} value={state.question_txt} />
                                    </Box>

                                    <Box>
                                      <p className="t">?????? ??????</p>
                                      <Input type="select" name="question_type" onChange={(e) => onChangehandler(e)} value={state.question_type}>
                                        <option>??????????????????. </option>
                                        <option value='1'>?????????</option>
                                        <option value='2'>?????????</option>
                                        <option value='3'>O / X</option>
                                        <option value='4'>?????????</option>
                                      </Input>
                                    </Box>

                                    {state.question_type === 1 || state.question_type === '1' || state.question_type === 4 || state.question_type === '4' ?
                                      <Box>
                                        <div><span className="t">?????????</span>

                                          <Bt>
                                            <Button type="submit" outline color="dark" onClick={(e) => onNumsubmit(e)}>+</Button>
                                            <Button type="submit" color="dark" onClick={(e) => onNumsubmit1(e)}>-</Button>
                                          </Bt>

                                          <div>{JSON.parse(state.question_choice).map((data, i) => (
                                            <Input key={i} type="text" name={"typenum" + `${i}`} onChange={(e) => typenumhandler(e)} defaultValue={data}></Input>
                                          ))
                                          }</div>

                                        </div></Box>
                                      : ""}

                                    <Box>
                                      <p className="t">???????????? ??????</p>
                                      <Input type="select" name="isDual" onChange={(e) => onChangehandler(e)} value={state.isDual}>
                                        <option>??????????????????.</option>
                                        <option value='0'>?????? ??????</option>
                                        <option value='1'>?????? ??????</option>
                                      </Input>
                                    </Box>

                                    <Box>
                                      <p className="t">??? ??????</p>
                                      <Input type="select" name="answer_type" onChange={(e) => onChangehandler(e)} value={state.answer_type}>
                                        <option>??????????????????.</option>
                                        <option value='1'>??????</option>
                                        <option value='2'>??????</option>
                                        <option value='3'>????????????</option>
                                        <option value='4'>O / X</option>
                                      </Input>
                                    </Box>

                                  </ModalBody>
                                  <ModalFooter>
                                    <Button style={{fontFamily: 'Jua'}} color="primary" onClick={(e) => modifyPost()}>??????</Button>{' '}
                                    <Button style={{fontFamily: 'Jua'}} color="secondary" onClick={(e) => xModal()} >??????</Button>
                                  </ModalFooter>
                                </Modal> : <Modal isOpen={false}></Modal>}

                                {/*?????? ?????? ?????? ???*/}
                                {qmodal === true ? <Modal isOpen={qmodal}  >
                                  <ModalHeader><span className="insertquestionform">?????? ??????</span></ModalHeader>
                                  <ModalBody>
                                    <Box>
                                      <p className="t">?????? ??????</p>
                                      <InputGroup>
                                        <Input type="text" name="question_txt" onChange={(e) => onChangehandler(e)}>
                                        </Input>
                                      </InputGroup>
                                    </Box>
                                    <Box>
                                      <p className="t">?????? ??????</p>
                                      <InputGroup>
                                        <Input type="select" name="question_type" onChange={(e) => onChangehandler(e)}>
                                          <option disabled> </option>
                                          <option> </option>
                                          <option value='1'>?????????</option>
                                          <option value='2'>?????????</option>
                                          <option value='3'>O/X</option>
                                          <option value='4'>?????????</option>
                                        </Input>
                                      </InputGroup>
                                    </Box>
                                    {state.question_type === "1" || state.question_type === "4" ? <div><Box><p className="t">??? ??????</p>
                                      <InputGroup>
                                        <Input type="text" name="type1"  defaultValue={1} onChange={(e) => onChangehandler(e)} >
                                        </Input>
                                        <Button type="submit" color="primary" onClick={(e) => onAddNumsubmit(e)}>+</Button>
                                      </InputGroup>
                                      {arr.map((data, i) => {
                                        return (
                                          <InputGroup key={i}>
                                            <Input type="text" name={"typenum" + `${i}`} onChange={(e) => onChangehandler(e)} >
                                            </Input>
                                          </InputGroup>
                                        )
                                      })}
                                    </Box></div> : ""}

                                    <Box>
                                      <p className="t">???????????? ??????</p>
                                      <Input type="select" name="isDual" onChange={(e) => onChangehandler(e)}>
                                        <option>??????????????????.</option>
                                        <option value='0'>?????? ??????</option>
                                        <option value='1'>?????? ??????</option></Input>
                                    </Box>

                                    <Box>
                                      <p className="t">??? ??????</p>
                                      <Input type="select" name="answer_type" onChange={(e) => onChangehandler(e)}>
                                        <option>??????????????????.</option>
                                        <option value='1'>??????</option>
                                        <option value='2'>??????</option>
                                        <option value='3'>????????????</option>
                                        <option value='4'>O / X</option>
                                      </Input>
                                    </Box>

                                    <div className="qsubmit">
                                      <Button style={{fontFamily: 'Jua'}} className="submitBt" onClick={(e) => xModal()}>??????</Button>
                                      <Button style={{fontFamily: 'Jua'}} type="submit" className="submitBt" color="primary" onClick={(e) => onSubmitQuestion(e)}>??????</Button>
                                    </div>
                                  </ModalBody>
                                </Modal> : <Modal isOpen={false}></Modal>}

                                {sDmodal === true ? <Modal isOpen={sDmodal}  >
                                  <ModalHeader><span className="dmodalheader">?????? ??????</span></ModalHeader>
                                  <ModalBody>
                                    <p className="dmodalbody">?????? ???????????? ?????? ?????????????????????????</p>
                                    <div className="deletesurveyBtn">
                                      <Button style={{fontFamily: 'Jua'}} color="primary" onClick={(e) => deleteSurvey(e)}>??????</Button>{' '}
                                      <Button style={{fontFamily: 'Jua'}} onClick={(e) => xModal()}>??????</Button>
                                    </div>
                                  </ModalBody>
                                </Modal> : <Modal isOpen={false}></Modal>}

                                {qDmodal === true ? <Modal isOpen={qDmodal}>
                                  <ModalHeader><span className="dmodalheader">?????? ??????</span></ModalHeader>
                                  <ModalBody>
                                    <p className="dmodalbody">?????? ????????? ?????? ?????????????????????????</p>
                                    <div className="deletesurveyBtn">
                                      <Button style={{fontFamily: 'Jua', marginRight: "2px"}} color="primary" onClick={(e) => questionDelete(e)}>??????</Button>
                                      <Button style={{fontFamily: 'Jua'}} color="secondary" onClick={(e) => xModal()} >??????</Button>
                                    </div>
                                  </ModalBody>
                                </Modal> : <Modal isOpen={false}></Modal>}

                              </Card>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    );
                  })}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Collapse>
      </Card>
    </div >
  );
};

export default Survey;