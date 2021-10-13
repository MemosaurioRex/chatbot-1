const express=require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index")
});

    
router.get("/registro", (req, res) => {
    res.render("registro")}
    );

    router.get("/homeAdm", (req, res) => {
        res.render("homeAdm")}
        );


module.exports= router;