import { useEffect, useState } from "react";
import { getCommands, getArguments, performRequest } from "./API";

function Form({data, setData}) {
    const [commands, setCommands] = useState([]); // List of commands avaliable
    const [selectedCommand, setSelectedCommand] = useState(); // Selected command
    const [commandArguments, setArguments] = useState([]); // Command arguments
    
    // Process command data and send it to the server
    function serverRequest(formData) {
        formData.preventDefault();
        const formObject = {};
        const argumentLength = formData.target.length - 1;
        for(let index = 0; index < argumentLength; index++) {
            formObject[formData.target[index].placeholder] = formData.target[index].value;
        }
        performRequest(selectedCommand, formObject).then(newCard => {
            newCard.content = newCard.result;
            setData([...data, newCard])
        })
    }

    // Get a list of arguments for the chosen command
    async function retrieveArguments(option) { // Running out of naming options here!
        if(option == "Select an option") {
            setArguments([]);
            return; // Clear arguments and return so we don't error
        }
        setSelectedCommand(option);
        getArguments(option).then((values) => {
            setArguments(values);
        })
    }

    useEffect(function() {
        getCommands().then(options => {
            setCommands(options)
        });
    }, [])

    return (<div className="add-card">
        <select onChange={(event) => retrieveArguments(event.target.value)} >
            <option>Select an option</option>
            {/* List possible commands */}
            {commands.map(function(comand) {
                return <option>{comand}</option>;
            })}
        </select>
        <form onSubmit={serverRequest}>
            {/* List possible arguments */}
            {commandArguments.map(function(argument) {
                return <input placeholder={argument}></input>
            })}
            <button type="submit">Submit</button>
        </form>
    </div>);
}

export default Form;