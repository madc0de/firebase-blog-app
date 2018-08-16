import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';


interface InputFieldWrapProps {
    label?: string
    error: boolean
    children: any
}

const InputFieldWrap: React.SFC<InputFieldWrapProps> = ({ label, error, children }) => (
    <div className={`input-group ${error ? 'error' : ''}`}>
        {children}
    </div>
)

interface IRenderErrorProps {
    touched: boolean
    error: string
}

const RenderError: React.SFC<IRenderErrorProps> = (props) => {
    return props.touched && props.error
        ? <div className="error">{props.error}</div>
        : (null)
}

interface CustomProps {
    placeholder?: string,
    children?: any
}

interface IRenderInputProps {
    ({ ...parms }: WrappedFieldProps & CustomProps): any
}

export const RenderTextInput: IRenderInputProps = ({
    input,
    label,
    placeholder,
    meta }) => {
    const { touched, error } = meta
    return (
        <InputFieldWrap label={label} error={touched && error}>
            {label && <label>{label}</label>}
            <input {...input} type="text" placeholder={placeholder} className="input" />
            <RenderError touched={touched} error={error} />
        </InputFieldWrap>
    )
}

export const RenderTextArea: IRenderInputProps = ({
    input,
    label,
    meta }) => {
    const { touched, error } = meta
    return (
        <InputFieldWrap error={touched && error}>
            {label && <label>{label}</label>}
            <textarea {...input} className="input markdwon-input" />
            <RenderError touched={touched} error={error} />
        </InputFieldWrap>
    )
}

export const RenderSelect: IRenderInputProps = ({
    input,
    meta,
    children
}) => {
    const { touched, error } = meta
    return (
        <InputFieldWrap error={touched && error}>
            <select {...input} className="input">
                {children}
            </select>
            <RenderError touched={touched} error={error} />
        </InputFieldWrap>
    )
}

export const RenderDateInput: IRenderInputProps = ({
    input,
    meta,
    label
}) => {
    const { touched, error } = meta
    return (
        <InputFieldWrap error={touched && error}>
            {label && <label>{label}</label>}
            <input {...input} type="date" className="input" />
            <RenderError touched={touched} error={error} />
        </InputFieldWrap>
    )
}

