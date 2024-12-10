import { useEffect, useState } from "react";

function Block({ title, deleteCard, content, id }) {
    let classes = content === "Loading..." ? "loading card" : "card";
    const [viewMode, setViewMode] = useState(1); // Set the view size

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
                {content}
                {content === "Loading..." ? <div className="loading-symbol"></div> : null}
            </div>
            <div className="card-buttons">
                <button onClick={deleteCard}>X</button> {/* Delete card */}
                <button onClick={() => setViewMode(viewMode - 1)}>-</button> {/* Shrink view */}
                <button onClick={() => setViewMode(viewMode + 1)}>+</button> {/* Enlarge view */}
            </div>
        </div>
    );
}

export default Block;