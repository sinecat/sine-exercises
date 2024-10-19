import React, {useState} from 'react';
import {Radio, Form, Card, Button} from 'antd';
import {useQuestionStore} from '../modal/currentQuestions'

const AnswerRadioBox = (props:{index:number}) => {
    const {index} = props;
    const {currentQuestions,setCurrentQuestion } = useQuestionStore();

    const handleChange = (e) => {
        setCurrentQuestion(index,e?.target?.value)
    }

    const handleBtnClick = ()=>{
        alert(JSON.stringify(currentQuestions))
    }

    return (
        <>
            <Card>
                <Button onClick={handleBtnClick}></Button>
                    <Radio.Group onChange={handleChange}>
                        <Radio value={'A'}>A</Radio>
                        <Radio value={'B'}>B</Radio>
                        <Radio value={'C'}>C</Radio>
                        <Radio value={'D'}>D</Radio>
                    </Radio.Group>
            </Card>
        </>
    );
};

export default AnswerRadioBox;
