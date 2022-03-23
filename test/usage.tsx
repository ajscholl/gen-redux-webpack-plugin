import React from "react";
import { connectCombined } from "./combined/reducer";
import { connectHiddenState } from "./hiddenState/reducer";
import { connectInclude } from "./include/reducer";
import { connectTodoApp } from "./todoApp/reducer";

interface BaseProps {
    content: string;
}

const Base: React.FC<BaseProps> = (props) => {
    return <div>{props.content}</div>;
};

const Combined = connectCombined(Base);
const HiddenState = connectHiddenState(Base);
const Include = connectInclude(Base);
const TodoApp = connectTodoApp(Base);

export const Usage = () => {
    return (
        <>
            <Combined content="combined" />
            <HiddenState content="hidden state" />
            <Include content="include" />
            <TodoApp content="todo app" />
        </>
    );
};
