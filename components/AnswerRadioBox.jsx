import React, {useState} from 'react';
import {Radio, Form, Card, Space, Button, Drawer} from 'antd';

const questions = Array.from({ length: 20 }, (_, i) => i + 1);

const AnswerRadioBox = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                答题卡
            </Button>
            <Drawer title="答题卡" placement="bottom" onClose={onClose} open={open}>
                <Form onFinish={(values) => {
                    console.log(values)
                }}>
                    <Card>
                        <Form.Item label={'Answer'} name={'one'} style={{marginBottom: 0}}>
                            <Radio.Group>
                                <Radio value={'A'}>A</Radio>
                                <Radio value={'B'}>B</Radio>
                                <Radio value={'C'}>C</Radio>
                                <Radio value={'D'}>D</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={'Answer'} name={'one'} style={{marginBottom: 0}}>
                            <Radio.Group>
                                <Radio value={'A'}>A</Radio>
                                <Radio value={'B'}>B</Radio>
                                <Radio value={'C'}>C</Radio>
                                <Radio value={'D'}>D</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={'Answer'} name={'one'} style={{marginBottom: 0}}>
                            <Radio.Group>
                                <Radio value={'A'}>A</Radio>
                                <Radio value={'B'}>B</Radio>
                                <Radio value={'C'}>C</Radio>
                                <Radio value={'D'}>D</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Card>
                    <Form.Item style={{marginTop: 10}}>
                        <Button type={'primary'} htmlType={'submit'}>提交</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default AnswerRadioBox;
