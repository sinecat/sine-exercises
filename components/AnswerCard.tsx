import React, {useState, useMemo} from 'react';
import {Button, Radio, theme, Popover, Form, Drawer, Flex, ConfigProvider, Space, Card, ButtonProps} from 'antd';
import {useWindowSize} from "@uidotdev/usehooks";
import {judgeAnswers} from "../constant/JudgeAnswers";
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {ScreenSizeType} from "../constant";

const questions = Array.from({length: 20}, (_, i) => ({
    index: i + 1,
    current: judgeAnswers[0][i],
    answer: undefined,
    isCorrect: -1
}));

const siteTheme = localStorage.getItem('rspress-theme-appearance') || ''

const AnswerCardButton = ({children, screenSize, ...rest}: ButtonProps & { screenSize: ScreenSizeType }) => {
    const smScreenCls = useEmotionCss(() => (
        {
            position: 'fixed',
            bottom: 30,
            right: 10,
        }
    ))

    const mdScreenCls = useEmotionCss(() => (
        {
            position: 'fixed',
            bottom: 30,
            right: 10,
        }
    ))

    const lgScreenCls = useEmotionCss(() => (
        {
            position: 'fixed',
            right: '18%',
            bottom: 30,
        }
    ))

    const screenClsObj = {
        sm: smScreenCls,
        md: mdScreenCls,
        lg: lgScreenCls
    }

    return <Button className={screenClsObj[screenSize]} {...rest}>{children}</Button>
};

const AnswerCard = () => {
    const [answers, setAnswers] = useState(questions);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const size = useWindowSize();

    const screenSize = useMemo(() => {
        if (size?.width < 960) return 'sm'
        if (size?.width < 1280) return 'md'
        return 'lg'
    }, [size])

    const cardCls = useEmotionCss(() => ({
        position: 'fixed',
        bottom: 0,
        display: open ? 'flex' : 'none',
        backgroundColor: '#fff',
        width: screenSize === 'lg' ? 750 : screenSize === 'md' ?620 : '100%',
        height: screenSize === 'sm' ? 180 : 'unset',
        overflow: 'auto',
        right: screenSize === 'lg' ? 260 : 0,
        // transform: screenSize==='sm' ? 'unset' : 'translateX(50%)',
        zIndex: 999
    }))

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleSelect = (currentIndex, value) => {
        const newAnswers = answers?.map((item) => {
            if (item.index === currentIndex) {
                return {...item, answer: value};
            }
            return item;
        });
        setAnswers([...newAnswers]);
    };

    const handleSubmit = () => {
        const currentAnswer = answers?.map(item => {
            return {...item, isCorrect: item.current === item?.answer ? 1 : 0}
        })
        setAnswers(currentAnswer)
    }

    const handleSubmitBtnClick = () => {
        form.submit();
    };

    return (
        <>
            <AnswerCardButton screenSize={screenSize} style={{display: open ? 'none' : 'block'}} type="primary"
                              onClick={showDrawer}>
                答题卡{size.width > 960 ? '（长按复制）' : ''}
            </AnswerCardButton>
            <ConfigProvider
                theme={{
                    // @ts-ignore
                    algorithm: siteTheme === 'dark' ? theme.darkAlgorithm : '',
                }}
            >
                <Card className={cardCls}>
                    <Flex gap={10} justify={'end'} style={{marginBottom: 20}}>
                        <Button onClick={() => setOpen(false)}>关闭</Button>
                        <Button type="primary" onClick={handleSubmitBtnClick}>提交</Button>
                    </Flex>
                    <Form form={form} onFinish={handleSubmit}>
                        {/*<Drawer mask={false} title="答题卡" placement="bottom" onClose={onClose} open={open} extra={*/}
                        {/*    <Button onClick={handleSubmitBtnClick}>提交</Button>*/}
                        {/*}>*/}
                        <Flex gap={13} wrap>
                            {answers?.map((item) => (
                                <Popover
                                    key={item.index}
                                    content={
                                        <Form.Item name={item.index} style={{marginBottom: 0}}>
                                            <Radio.Group
                                                onChange={(e) => handleSelect(item.index, e.target.value)}
                                                value={item.answer}
                                            >
                                                <Radio value="A">A</Radio>
                                                <Radio value="B">B</Radio>
                                                <Radio value="C">C</Radio>
                                                <Radio value="D">D</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    }
                                    trigger="click">
                                    <Space>
                                        <div style={{width: 10}}>{item.index}</div>
                                        <Button
                                            variant="solid"
                                            // @ts-ignore
                                            color={item.isCorrect !== -1 ? item.isCorrect === 1 ? 'green' : 'danger' : item.answer ? 'primary' : ''}
                                            style={{width: 50}}
                                        >
                                            {item.answer ? `${item.answer}` : '未答'}
                                        </Button>
                                    </Space>
                                </Popover>
                            ))}
                        </Flex>
                        {/*</Drawer>*/}
                    </Form>
                </Card>
            </ConfigProvider>
        </>
    );
};

export default AnswerCard;

