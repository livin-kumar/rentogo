const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../model/user");
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    let user = new User({
      category:req.body.cat,
      phno:req.body.pno,
      mail:req.body.mail,
      deposit:req.body.deposit,
      min_rent_per_day:req.body.min,
      desc:req.body.desc,
      rating:0,
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
