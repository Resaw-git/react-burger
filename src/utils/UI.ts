import { Tab as TabUI } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";

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