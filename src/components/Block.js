function Block({title, metadata, content}) {
    let classes = content == "Loading..." ? "loading card" : "card";
    return (<div className={classes}>
        <h3>
            {title}
        </h3>
        <div className="result-content">
            {content}
            {content == "Loading..." ? <div className="loading-symbol"></div> : null}
        </div>
    </div>);
}

export default Block;