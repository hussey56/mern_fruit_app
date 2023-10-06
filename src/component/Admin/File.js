import React , {useState} from 'react'
import axios from 'axios'
const File = (props) => {
 const {showAlert} = props;


  const [file, setFile] = useState(null);


  const handleFileUpload = (e) => {
  const  files = e.target.files[0];
    setFile({ 
      file: files,
      filepath: `uploads/${files.name}`
    })
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file.file);
    formData.append("filepath", file.filepath);


    axios.post("http://localhost:5000/api/files/upload", formData).then((res) => {
       if(res.data){
showAlert("success","Your Image has been Added")
       }
       else if(res.existing){
        showAlert("warning","Same Image has not been Added")
    
       }
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
         <form onSubmit={handleSubmit}>

      <input type="file" required onChange={handleFileUpload} accept='.png'/>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default File
