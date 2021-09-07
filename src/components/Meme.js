import React, { useState } from 'react';
import Button from './UI/Button';
import styles from './Meme.module.css';
import Card from './UI/Card'
import CaptionEntry from './CaptionEntry';
const Meme=()=>{


    const [meme,setMeme]=useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError]= useState(null);

    const memeGenerate=async()=>{
        setIsLoading(true)
        const response= await fetch("https://api.imgflip.com/get_memes");
        if(!response.ok){
            setError("Couldnt get memes right now. :(");
            return;
        }
        const data = await response.json();
        const memes= await data.data.memes;
        setIsLoading(false);
        return memes;
        
    }

    const addCaptionHandler=async(textObj)=>{

            const url=new URL("https://api.imgflip.com/caption_image");
            const params={
                "template_id": meme.id,
                "username": "SahilSrivastava",
                "password": "krlohack",
                "boxes[0][text]": textObj.text0,
                "boxes[1][text]": textObj.text1,
                "max_font_size": textObj.font
            }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            const response= await fetch(url,{
                method: "POST",
            });
            
            
            if(!response.ok){
                setError("Couldnt Make you a meme,right now :(")
                return;
            }
            const data = await response.json();
      
            const memeUrl= await data.data.url;

            
            setMeme(meme=>{
                return {...meme,url:memeUrl}
            })
        

    
    }

    const clickHandler=async()=>{
        const randomNumber=Math.floor((Math.random() * 100) + 1);
        const memesList=await memeGenerate();
        const meme= memesList[randomNumber];
        if(!meme || meme.box_count!==2){
            clickHandler();
        }
        setMeme(meme);
    }  
    

    return(<Card>
        <h1 className={`display-3 ${styles.meme}`}>Meme Generator</h1>
        <hr/>
        {error && <p>{error}</p>}
        {isLoading && <div className={styles.loading}/>}
        {meme && <h5>{meme.name}</h5>}
        {meme && <img className={`img-fluid ${styles.img}`} src={meme.url} alt={meme.name} width={meme.width} height={meme.height}/>}

        <Button onClick={clickHandler}>Get Meme</Button>
        {meme && <hr/>}
        {meme && <CaptionEntry boxCount={meme.box_count} onAddCaption={addCaptionHandler}/>}
        {meme && <hr/>}
        {meme && <code>More updates soon uWu</code>}
    </Card>)


}

export default Meme;