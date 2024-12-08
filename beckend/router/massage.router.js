const express = require("express");
const massageService = require("../services/massage.service");
const middlewares = require("../services/middlewares")
const router = express.Router();

//GET ALL USER MASSAGE
router.get('/search', middlewares.authentication, async (req, res) => {
    try {
        const data = await massageService.searchEmails(req.user.email, req.query.text)
        res.send(data)
    }
    catch (error) {
        console.log(error,"e");
        res.status(400).send(error)
    }
})

//GET ALL USER MASSAGE
//INBOX EMAIL
router.get('/', middlewares.authentication, async (req, res) => {
    try {
        const data = await massageService.getAllMyInboxEmail(req.user.email)
        res.send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//OUTBOX EMAIL
router.get('/from', middlewares.authentication, async (req, res) => {
    try {
        const data = await massageService.getAllMyOutboxEmail(req.user.email)
        res.send(data)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})


//READ MASSAGE
router.put('/reading/:id', middlewares.authentication, async (req, res) => {
    try {
        const readMassage = await massageService.alreadyReadMassage(req.user.email, req.params.id)
        res.status(200).send(readMassage)
    }
    catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
})


//DELETE MASSAGE
router.delete("/del/:id", middlewares.authentication, async (req, res) => {
    try {
        const delMassage = await massageService.deleteOneMassageById(req.user.email, req.params.id);
        res.status(200).send(delMassage);
    } catch (err) {
        res.status(400).send(err);
    }
});

//ONLY THE SENDER DELETE
router.delete('/senderDelete/:id',middlewares.authentication, async (req, res)=>{
    try{
        const delMassage = await massageService.onlyTheSenderDelete(req.user.email, req.params.id)
        res.status(204).send(delMassage)
    }
    catch(error){
        res.status(400).send(error)
    }
})


//TRASH EMAIL
router.get("/trashMail", middlewares.authentication, async (req, res) => {
    try {
        const massages = await massageService.getTrashMail(
            req.user.email
        );
        console.log(massages);
        res.send(massages);
    } catch {
        res.status(500).send("Internal Server Error");
    }
});


//SEND MASSAGE
router.post("/send", middlewares.authentication, async (req, res) => {
    try {
        const newMassage = await massageService.sendMassage(req.user.email, req.body);
        res.send(newMassage);
    } catch (err) {
        res.status(400).send(err);
    }
});




module.exports = router;
