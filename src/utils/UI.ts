import { Button as ButtonUI, Tab as TabUI } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, SyntheticEvent} from "react";

export const Button: FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
}> = ButtonUI

export const Tab: FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: React.ReactNode;
}> = TabUI

export declare const PasswordInput: ({ value, onChange, name, size }: {
    value: string;
    name: string;
    size?: "small" | "default" | undefined;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}) => JSX.Element;