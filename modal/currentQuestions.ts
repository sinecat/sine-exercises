import {create} from "zustand/react";
import {judgeAnswers} from '../constant/JudgeAnswers'

type questionType = {
    index: number,
    currentAnswer: string | undefined
    answer: string | undefined,
    isCorrect: -1 | 0 | 1
}

interface QuestionState {
    currentQuestions: questionType[];
    setCurrentQuestion: (index: number, value: string) => void;
    setAllQuestionsCorrect: (index: number) => void;
}

export const useQuestionStore = create<QuestionState>((set) => ({
    currentQuestions: Array.from({length: 20}, (_, i) => ({
        index: i + 1,
        currentAnswer: undefined,
        answer: undefined,
        isCorrect: -1
    })),
    setCurrentQuestion: (index: number, value: string) => {
        set((state) => ({
            currentQuestions: state.currentQuestions.map((question) =>
                question.index === index ? {...question, answer: value} : question
            )
        }));
    },
    setAllQuestionsCorrect: (questionNum: number) => {
        set((state) => ({
            currentQuestions: state.currentQuestions.map((question, index) => {
                    const currentAnswer = judgeAnswers[questionNum][index]
                    return {
                        ...question,
                        currentAnswer,
                        isCorrect: question.answer === currentAnswer ? 1 : 0
                    }
                }
            )
        }));
    }
}));