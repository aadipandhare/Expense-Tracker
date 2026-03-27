import React,{useState,useRef} from 'react'
import { LuUser, LuUpload, LuTrash} from "react-icons/lu"

export const ProfilePhotoSelector = (image, setImage) => {

    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange=()=>{
        const file = event.target.files[0];
        
        if(file){
            setImage(file);

            const preview= URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = ()=>{
        setImage(null)
        setPreviewUrl(null)
    }

    const onChooseFile = ()=>{
        inputRef.current.click();
    }

  return (
    <div>
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className=""
        />
    </div>
  )
}
