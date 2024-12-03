import { useEffect, useState } from "react";
import { getOptions, getArguments, performRequest } from "./API";

function Form({data, setData}) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [requestArguments, setArguments] = useState([]);
    function serverRequest(formData) {
        formData.preventDefault();
        const formObject = {};
        const argumentLength = formData.target.length - 1;
        for(let index = 0; index < argumentLength; index++) {
            formObject[formData.target[index].placeholder] = formData.target[index].value;
        }
        performRequest(selectedOption, formObject).then(newCard => {
            newCard.content = newCard.result;
            setData([...data, newCard])
        })
    }
    async function retrieveArguments(option) { // Running out of naming options here!
        if(option == "Select an option") {
            setArguments([]);
            return; // Clear arguments and return so we don't error
        }
        setSelectedOption(option);
        getArguments(option).then((values) => {
            setArguments(values);
        })
    }
    useEffect(function() {
        getOptions().then(options => {
            setOptions(options)
        });
    }, [])
    return (<div className="add-card">
        <select onChange={(event) => retrieveArguments(event.target.value)} >
            <option>Select an option</option>
            {options.map(function(option) {
                return <option>{option}</option>;
            })}
        </select>
        <form onSubmit={serverRequest}>
            {requestArguments.map(function(argument) {
                return <input placeholder={argument}></input>
            })}
            <button type="submit">Submit</button>
        </form>
    </div>);
}

export default Form;