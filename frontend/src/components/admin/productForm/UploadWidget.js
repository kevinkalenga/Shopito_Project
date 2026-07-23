import React, { useState } from 'react'
import Card from '../../card/Card'
import { AiOutlineCloudUpload } from "react-icons/ai";
import {BsTrash} from "react-icons/bs"

const UploadWidget = () => {
  
  // To select into the camputer
  const [selectedImages, setSelectedImages] = useState([])
  // To add into the cloudinary
  const [images, setImages] = useState([])
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  
  const addImages = (e) => {
    // All the files selected
    const selectedFiles = e.target.files 
    // to create an array of files
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
       return URL.createObjectURL(file)
    })
    // upload to cloudinary
    setImages((prevImages) => prevImages.concat(selectedFilesArray))
    
    // Adding the array in what currenctly exist
    setSelectedImages((prevImages) => prevImages.concat(imagesArray))

    e.target.value = ""
  }
  
  
  return (
    <div>
       <Card cardClass={"formcard group"}>
          <label className='uploadWidget'>
             <AiOutlineCloudUpload size={35} />
             <br />
             <span>Click to upload up to 5 images</span>
             <input 
               type="file"
               name="images"
               onChange={addImages}
               multiple
               accept="image/png, image/jpeg, image/webp"
             />
          </label>
          <br />

          {/* View Selected Images */}
          <div className={selectedImages.length > 0 ? "images" : ""}>
             {
              selectedImages !== 0 && 
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className='image'>
                      <img src={image} alt="productImage" width={200} />
                      <button className='-btn'>
                         <BsTrash />
                      </button>
                      <p>{index + 1}</p>
                  </div>
                )
              })
             }
          </div>
       </Card>
    </div>
  )
}

export default UploadWidget