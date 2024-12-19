import express from "express"
import dotenv from 'dotenv'
import multer from "multer"
import doc2pdf from "docx-pdf"
import { fileURLToPath } from 'url';
import path from "path"
dotenv.config()

const app = express()
app.use(express.static("Public"))
const port = process.env.PORT || 4000

const __filename = fileURLToPath(import.meta.url);
const currentPath = path.dirname(__filename)
const destnPath = path.join(currentPath,'../Public/uploads') 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destnPath )
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage })

  app.post('/api/convertFile', upload.single('fileinput'),(req,res,next)=>{
    try {
        if(!req.file) return res.status(400).json({message:"No file uploaded"})

          let outputPath = path.join(
            currentPath,
            "../Public/files",
            `${req.file.originalname}.pdf`
        );
      

        doc2pdf(req.file.path, outputPath, (err, result) =>{
          
            if(err){
              console.log(err);
              return res.status(500).json({
                message:"Error while converting file"
              })
            }
            res.setHeader('message',"file downloaded succefully")
            res.download(outputPath,()=>{
                console.log("file downloaded succefully");
              })
              
          });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
          })
    }
  })






app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${port}`);
})