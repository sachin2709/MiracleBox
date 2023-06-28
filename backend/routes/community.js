const express = require("express");
const router = express.Router();


const {
    getAllCommunities,
    getCommunity,
    createCommunity,
    updateCommunity,
    deleteCommunity

}= require("../controllers/community");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");



router.post("/community/create",createCommunity);

router.get("/community/all",getAllCommunities);




router.get("/community/:commId",getCommunity);

router.put("/community/:commId",updateCommunity);

router.delete("/community/:commId",deleteCommunity);


module.exports=router;
