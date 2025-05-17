
import { GoogleGenerativeAI } from "@google/generative-ai";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI();

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
export const getImage = async (req, res) => {

    const prompt = req.body.prompt;
    console.log('hi')

    try {
      const response = await model.generateContent(prompt); // Use await for async call
      const imageData = response; // Extract image data
      res.status(200).json({ imageData }); // Send image data in response
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: "Failed to generate image" });  // Handle errors
    }
  };
  