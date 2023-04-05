import express from "express";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/Post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POST
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            status:true,
            message:"All Post Find Successfully",
            data:posts,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Photo Not Posted",
            errors: error.message
        });
    }
});

//CREATE A POST
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoURL = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoURL.url,
        });

        res.status(200).json({
            status: true,
            message: "Photo Post Successfully....",
            data: newPost,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Photo Not Posted",
            errors: error.message
        });
    }
});

export default router;