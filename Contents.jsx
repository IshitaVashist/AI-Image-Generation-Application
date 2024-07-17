import { useState, useRef } from 'react';
import './Contents.css';
import Star from '/star.webp'; 

const Contents = () => {
  const [image,setImage] = useState("/");
  const inputRef = useRef(null);

  const query = async (data) => {
    try {
      const Image = document.getElementsByClassName("default-image");
      Image.src="painting.gif";
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      setImage(URL.createObjectURL(result));
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  const handleClick = () => {
    const inputText = inputRef.current.value;
    query({ inputs: inputText });
  };

  return (
    <div>
      <h1 className="heading1">AI - IMAGE - GENERATION APPLICATION</h1>
      <div className="main-block">
        <div className="sidebar">
          <input
            type="text"
            placeholder='"Tell Me Here What You Would Like To See"'
            ref={inputRef}
            className="prompt-bar"
          />
          <button className="generate-button" onClick={handleClick}>
            GENERATE IMAGE
          </button>
        </div>
        <span className="default-image">
          {image === "/" ? <img src={Star} alt="Star" style={{ height: "390px", width: "511px" }} /> : <img src={image} alt="Generated" style={{ height: "390px", width: "511px" }} />}
        </span>
      </div>
    </div>
  );
};

export default Contents;
