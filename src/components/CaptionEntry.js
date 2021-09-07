import { useRef } from "react";
import styles from "./CaptionEntry.module.css"
const CaptionEntry=(props)=>{

    const nameRef1=useRef();
    const nameRef2=useRef();
    const sizeRef=useRef();

    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredCaption1 = nameRef1.current.value;
        const enteredCaption2 = nameRef2.current.value;
        const enteredFont= sizeRef.current.value || "30";

        
        props.onAddCaption({text0: enteredCaption1 || " " ,text1: enteredCaption2 || " ",font: enteredFont})

    }


    return(<form onSubmit={submitHandler}>
        <label htmlFor="text" className="fs-4">Enter Caption</label>
        <br/>
        <input placeholder="Top-Text" className="form-control" type="text" id="text" ref={nameRef1}/>
        <input placeholder="Bottom-Text" className="form-control" type="text" id="text2" ref={nameRef2}/>
        <br/>
        <label htmlFor="range" className="form-label">Font-Size:</label>
        <input type="range" className="form-range" min="16" max="50" id="range" ref={sizeRef}/>
        <br/>
        <button className={`btn btn-success ${styles.generate}`}>Generate</button>
        </form>)
}

export default CaptionEntry;