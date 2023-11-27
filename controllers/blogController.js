const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
// import blogModel from '../models/blogModel';

// GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blog Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      error,
    });
  }
};

//Create Blog
exports.createBlogController = async (req, res) => {
  const { title, description, image, userId } = req.body;

  try {
    // Validation
    if (!title || !description || !image || !userId) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existingUser = await userModel.findById(userId);

    // Validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user: userId });

    // Save the new blog
    await newBlog.save();

    // Update the user's blogs array
    existingUser.blogs.push(newBlog);
    await existingUser.save();

    // Populate the user field in newBlog before sending the response
    const populatedBlog = await blogModel
      .findById(newBlog._id)
      .populate("user", "name");

    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog: populatedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error While Creating Blog",
      error: error.message,
    });
  }
};

//Update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    // update ke liye humlogo ko 3 parameter pass krna padta h 1st particular id jisse humlog change kr rahe h or {new:true} krna padta h
    return res.status(200).send({
      success: true,
      message: "Blog updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating Blog",
    });
  }
};

//Single Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    await blogModel.findOneAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Blog Deleted",
    });
  } catch {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Deleting Blog",
      error,
    });
  }
};
