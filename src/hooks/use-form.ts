import { useState} from "react";

interface IForm {
    target: {
        value: string;
        name: string;
    }
}

interface IInputValues {
    name: string;
    password: string;
    email: string;
    token: string;
}

export function useForm(inputValues: IInputValues) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: IForm ) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}