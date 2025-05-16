const multer = require("multer");

// Configure storage
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads/'); // Storage destination set as uploads/ folder
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Filenames are saved with current timestamp
    },
});

// File filter
const fileFilter = (req,file,cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    } else{
        cb(new Error('Only .jpeg, .jpg and .png are allowed.'), false);
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;