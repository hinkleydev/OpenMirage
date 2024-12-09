import { useEffect, useState } from "react";

function Block({title, deleteCard, content}) {
    let classes = content == "Loading..." ? "loading card" : "card";
    const [viewMode, setViewMode] = useState(1); // Set the view size
    useEffect(function() {
        if(viewMode < 1) {
            setViewMode(1); // Safety barrier so it can't be shrunk to nothing
        }
    }, [viewMode])

    return (<div className={classes} style={{width: (20 * viewMode) + "%"}}>
        <h3>
            {title}
        </h3>
        <div className="result-content">
            {content}
            {content == "Loading..." ? <div className="loading-symbol"></div> : null}
        </div>
        <div className="card-buttons">
            <button onClick={deleteCard}>X</button> {/* Delete card */}
            <button onClick={() => setViewMode(viewMode - 1)}>-</button> {/* Shrink view */}
            <button onClick={() => setViewMode(viewMode + 1)}>+</button> {/* Enlarge view */}
            <button onClick={() => setViewMode(4)}>&lt;-&gt;</button> {/* Full view */}
        </div>
    </div>);
}

export default Block;