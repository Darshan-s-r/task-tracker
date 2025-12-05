import OpenAI from "openai";
import { configDotenv } from "dotenv";
configDotenv();
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const extractdata = async (req, res) => {
  try {
    const { rawText } = req.body;

    const inputText = `extract the data from given text and give the answer in JSON formate, only give the answer don't add anything extra, this is the example text : Create a high priority task to review the pull request for the authentication
module by tomorrow evening and this is the expected output output : { "title": "Review the pull request for the authentication module",
"priority": "high",
"dueDate": "2025-12-15 T 6:00 PM",
"status": "toDo"
}
Title: The main task description,
 the priority should only contains one of these ('low', 'medium', 'high'), these are case sensitive.
Due Date: Parse relative dates ("tomorrow", "next Monday", "in 3
days") and absolute dates ("15th January", "Jan 20"), and status should only contains one of these ('todo', 'in-progress', 'completed')  these are case sensitive.
this is the text to be extracted text : ${rawText} `;

    if (!rawText) {
      return res.status(400).json({ error: "rawText is required" });
    }

    const response = await client.responses.create({
      model: "openai/gpt-oss-120b",
      input: inputText,
    });

    const result = response.output_text;
    return res.status(200).json({
      success: true,
      task: result,
    });
  } catch (error) {
    console.error("Error in extractdata:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
