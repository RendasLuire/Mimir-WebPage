import { useState } from "react";

const useForm = (inicialForm = {}) => {
    const [formState, setFormState] = useState(inicialForm)
    const onInputChange = ({target}) => {
        const {name, value} = target
        setFormState({
            ...formState,
            [name]:value
        })
    }

    return {
        ...formState,
        formState,
        onInputChange
    }
}

export default useForm