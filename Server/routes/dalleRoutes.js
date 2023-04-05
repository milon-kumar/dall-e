import express from "express";

import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai"

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send(openAi);
});

router.route('/ai').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openAi.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Image Ganerated Failed",
            errors: error?.message,
        });
    }
});

export default router;