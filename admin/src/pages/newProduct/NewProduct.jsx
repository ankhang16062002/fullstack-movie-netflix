import './newproduct.css'
import {useContext, useState} from 'react'
import storage from '../../firebase'
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';

const NewProduct = () => {
  const [movie, setMovie] = useState({})
  const [img, setImg] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgSm, setImgSm] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  const [uploaded, setUploaded] = useState(0)

  const {dispatch} = useContext(MovieContext)

  const handleChange = (e) => {
    const value = e.target.value
    setMovie({...movie, [e.target.name]: value})
  }

  const upload = (items) => {
    items.forEach(item => {
      const fileName = new Date().getTime()+ item.label + item.file.name
      //create a folder in fire store, và put my file
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
      //listen every thing changed when upload process
      uploadTask.on("state_changed", 
      snapshot => {
        //see process by transferred data / total data 
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is" + process + " % done.")

      }, 
      err => console.log(err),
      () => {
        //return my file URL uploaded
        uploadTask.snapshot.ref.getDownloadURL()
        .then(url => {
          setMovie(prev => {
            return {...prev, [item.label]: url}
          })
          setUploaded(prev => prev+1)
        })
      }
      )
    })
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload([
      {file: img, label: "img"},
      {file: imgTitle, label: "imgTitle"},
      {file: imgSm, label: "imgSm"},
      {file: trailer, label: "trailer"},
      {file: video, label: "video"},
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createMovie(movie, dispatch)
  }

  return (
    <div className='newProduct'>
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <input type="file" id="img" name='img' onChange={e => setImg(e.target.files[0])}/>
            </div>
            <div className="addProductItem">
              <label>Title Image</label>
              <input type="file" id="imgTitle" name='imgTitle'  onChange={e => setImgTitle(e.target.files[0])}/>
            </div>
            <div className="addProductItem">
              <label>Thumbnail Image</label>
              <input type="file" id="imgSm" name='imgSm' onChange={e => setImgSm(e.target.files[0])}/>
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <input type="text" placeholder="Iron Man" name='title' onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input type="text" placeholder="description" name='description' onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Year</label>
              <input type="text" placeholder="year" name='year' onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Genre</label>
              <input type="text" placeholder="genre" name='genre' onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Duration</label>
              <input type="text" placeholder="duration" name='duration' onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Limit</label>
              <input type="text" placeholder="limit" name='limit' onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Is Series?</label>
              <select id="isSeries" name='isSeries' onChange={handleChange}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
              </select>
            </div>
            <div className="addProductItem" name='trailer'>
              <label>Trailer</label>
              <input type="file" name="trailer" onChange={e => setTrailer(e.target.files[0])}/>
            </div>
            <div className="addProductItem" name='video'>
              <label>Video</label>
              <input type="file" name='video' onChange={e => setVideo(e.target.files[0])}/>
            </div>
            {
              uploaded === 5 ? (
                <button className="addProductButton" onClick = {handleSubmit}>Create</button>
              ) : (
                <button className="addProductButton"  onClick={handleUpload}>Upload</button>
              )
            }
        </form>
    </div>
  )
};

export default NewProduct;