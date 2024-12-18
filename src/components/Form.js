import { useEffect, useState } from "react";
import { getCommands, getArguments, performRequest } from "./API";

function Form({data, setData}) {
    const [commands, setCommands] = useState([]); // List of commands avaliable
    const [selectedCommand, setSelectedCommand] = useState(); // Selected command
    const [commandArguments, setArguments] = useState([]); // Command arguments
    const [cardTitle, setCardTitle] = useState(); // Title of card
    
    // Process command data and send it to the server
    function serverRequest(formData) {
        formData.preventDefault();
        const formObject = {};
        const argumentLength = formData.target.length - 1;
        for(let index = 0; index < argumentLength; index++) {
            formObject[formData.target[index].placeholder] = formData.target[index].value;
        }
        const oldData = data; // Just in case the request fails
        setData([...data, {title: cardTitle, content: "Loading..."}]);
        performRequest(selectedCommand, formObject).then(newCard => {
            newCard.title = cardTitle;
            newCard.content = newCard.result;
            newCard.context = formObject; // Save the context of the request
            newCard.error = newCard.code !== undefined; // If there is an error, set the error flag. There will be a code if there is an error
            setCardTitle(selectedCommand + " #" + (data.length + 2)); // Because an extra card is just about to be added to the list, we need to add one more
            setData([...data, newCard]);
        }).catch(error => {
            setData(oldData); // Reset the data if the request fails
            alert("Something went wrong, please check all the right arguments were selected");
        });
    }

    // Get a list of arguments for the chosen command
    async function retrieveArguments(option) { // Running out of naming options here!
        if(option === "Select an option") {
            setArguments([]);
            return; // Clear arguments and return so we don't error
        } else if (option === "Refresh commands") { // Refresh commands and clear fields
            getCommands().then(options => {
                setCommands(options)
                setArguments([]);
                setSelectedCommand();
                setCardTitle("");
                setArguments([]);
            });
            return;
        }
        setSelectedCommand(option);
        setCardTitle(option + " #" + (data.length + 1));
        getArguments(option).then((values) => {
            setArguments(values);
        })
    }

    useEffect(function() { // On page load, get the list of commands
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
            <option>Refresh commands</option>
        </select><br />
        <label for="card-title">Card title</label>
        <br />
        <input id="card-title" type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} /><br />
        <form onSubmit={serverRequest}>
            {/* List possible arguments */}
            {commandArguments.map(function(argument) {
                return <div><label for={"arg_" + argument}>{argument}</label><br /><input id={"arg_" + argument} placeholder={argument}></input></div>
            })}
            <button type="submit">Submit</button>
        </form>
    </div>);
}

export default Form;