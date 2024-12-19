import express from "express"
import multer from "multer"
import path from 'path'
import doc2pdf from "docx-pdf"
const app = express()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join())
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
const upload = multer({storage:storage})
app.post("/convertFile",upload.single('fileinput'),async(req,res,next)=>{
    try {
        if(!req.file) return res.status(400).json({
            message:"no file uploaded"
        })

        const outputPath = path.join(__dirname,"../Public/files", `${req.file.originalname}`)

        await docxConverter(req.file.path,outputPath,function(err,result){
            if(err){
              console.log(err);
            }
            res.download(outputPath,()=>{
                console.log("file uploaded",'result: '+ result);
            })
          });
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
          })
    }

})