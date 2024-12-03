function Block({title, metadata, content}) {
    return (<div className="card">
        <h3>
            {title}
        </h3>
        <div className="result-content">
            {content}
        </div>
    </div>);
}

export default Block;