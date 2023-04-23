function FileInput(props){
    const {choiceFile, title} = props;

    return(
        <>
            <input id="upload-file" type="file" style={{width: "calc(100% - 8px)", opacity: "0", position: "absolute", zIndex: "-1"}} onChange={e => choiceFile(e.target.files[0])}/>
            <label htmlFor="upload-file" style={{ backgroundColor: "#FFFFFF", color: "#000000", fontSize: "16px", cursor: "pointer"}}>
                {title}
            </label>
        </>
    )
}

export default FileInput;