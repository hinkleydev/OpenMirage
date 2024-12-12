import { useEffect, useState } from "react";

function Block({ title, deleteCard, content, context, error, id }) {
    let classes = content === "Loading..." ? "loading card" : "card";
    classes += error ? " error" : ""; // Add error class if there is an error
    const [viewMode, setViewMode] = useState(1); // Set the view size
    const [viewContext, setViewContext] = useState(false); // Set view the context

    useEffect(() => {
        if (viewMode < 1) {
            setViewMode(1); // Safety barrier so it can't be shrunk to nothing
        }
    }, [viewMode]);

    return (
        <div id={id} className={classes} style={{ gridColumn: "span " + viewMode }} tabIndex="-0">
            <h3 title={title}>
                {title}
            </h3>
            <div className="result-content">
                {viewContext == true ? <div className="context">{JSON.stringify(context)}</div> : content}
                {content === "Loading..." ? <div className="loading-symbol"></div> : null}
            </div>
            <div className="card-buttons">
                <button onClick={deleteCard}>X</button> {/* Delete card */}
                <button onClick={() => setViewMode(viewMode - 1)}>-</button> {/* Shrink view */}
                <button onClick={() => setViewMode(viewMode + 1)}>+</button> {/* Enlarge view */}
                <button onClick={() => setViewContext(!viewContext)}>?</button> {/* Toggle context */}
            </div>
        </div>
    );
}

export default Block;