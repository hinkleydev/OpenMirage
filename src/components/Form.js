import { useEffect, useState } from "react";
import { getOptions } from "./API";

function Form({data, setData}) {
    const [options, setOptions] = useState([]);
    useEffect(function() {
        getOptions().then(options => {
            setOptions(options)
        });
    }, [])
    return (<div className="add-card">
        <select>
            <option>Select an option</option>
            {options.map(function(option) {
                return <option>{option}</option>;
            })}
        </select>
    </div>);
}

export default Form;