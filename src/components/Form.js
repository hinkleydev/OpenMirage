import { useEffect, useState } from "react";
import { getOptions, getArguments } from "./API";

function Form({data, setData}) {
    const [options, setOptions] = useState([]);
    const [requestArguments, setArguments] = useState([]);
    async function retrieveArguments(option) { // Running out of naming options here!
        if(option == "Select an option") {
            setArguments([]);
            return; // Clear arguments and return so we don't error
        }
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
        <form>
            {requestArguments.map(function(argument) {
                return <input placeholder={argument}></input>
            })}
        </form>
    </div>);
}

export default Form;