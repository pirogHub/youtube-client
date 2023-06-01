import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface IFieldProps {
    error?: FieldError
}

type TypeTextAreaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> & IFieldProps


export interface ITextArea extends TypeTextAreaPropsField { }