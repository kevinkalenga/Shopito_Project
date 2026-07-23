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

  const removeImage = (image) => {
    // the img that we selected to the browser
     const imageIndex = selectedImages.indexOf(image);
     setSelectedImages(
       selectedImages.filter((img) => img !== image)
     )
    // the img that we uploaded to the cloudinary
    setImages(
      images.filter((img, index) => index !== imageIndex)
    )

    URL.revokeObjectURL(image)
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
          {
            selectedImages.length > 0 && (
               (selectedImages.length > 5 ? (
                  <p className='error'>You can't upload more than 5 images!
                    <br />
                    <span>Please remove <b>{selectedImages.length - 5}</b> of them</span>
                  </p>
               ):(
                <div className='--center-all'>
                  <button className='--btn --btn-danger --btn-large'>
                    Upload Image
                  </button>
                </div>
               )
              )
            )
          }

          {/* View Selected Images */}
          <div className={selectedImages.length > 0 ? "images" : ""}>
             {
              selectedImages !== 0 && 
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className='image'>
                      <img src={image} alt="productImage" width={200} />
                      <button className='-btn' onClick={() => removeImage(image)}>
                         <BsTrash size={25}/>
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