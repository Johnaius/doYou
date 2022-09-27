const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      var users = [];
      for (i in posts) {
        var user = await User.findById(posts[i].user);
        users.push(user.userName);
      }
      res.render("feed.ejs", { posts: posts, userName: users, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: "desc" })
        .populate("user")
        .lean();
      res.render("post.ejs", {
        post: post,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
        await Post.create({
        seven: req.body.seven,
        five: req.body.five.trim().split("\r\n"),
        three: req.body.three.trim().split("\r\n"),
        one: req.body.one,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res)=>{
  //   var liked = false
  //   try{
  //     var post = await Post.findById({_id:req.params.id})
  //     liked = (post.likes.includes(req.user.id))
  //   } catch(err){
  //   }
  //   //if already liked we will remove user from likes array
  //   if(liked){
  //     try{
  //       await Post.findOneAndUpdate({_id:req.params.id},
  //         {
  //           $pull : {'likes' : req.user.id}
  //         })

  //         console.log('Removed user from likes array')
  //         res.redirect('back')
  //       }catch(err){
  //         console.log(err)
  //       }
  //     }
  //     //else add user to like array
  //     else{
  //       try{
  //         await Post.findOneAndUpdate({_id:req.params.id},
  //           {
  //             $addToSet : {'likes' : req.user.id}
  //           })

  //           console.log('Added user to likes array')
  //           res.redirect(`back`)
  //       }catch(err){
  //           console.log(err)
  //       }
  //     }
  //   },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });

      // let comment= await Comment.findById({ _id: req.params.id });

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      // await Comment.remove({ post: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
