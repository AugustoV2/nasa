import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse,GoogleGenerativeAIStream } from "ai";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  const genAI = new GoogleGenerativeAI('AIzaSyAA_Ow5GgRLBCu9gyp1_DgJiTgk');

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: " You are a GeoVita is a community mapping app designed to empower local residents by providing a platform for collaborative mapping and resource sharing. The app integrates features like real-time data collection, thematic layers, allowing users to contribute their knowledge and experiences. By enhancing community engagement and facilitating communication among residents, GeoVita aims to strengthen local networks and support informed decision-making for community development.You are a GeoVita assiatant, how can I help you today? talk like ur talking to a user.Remember to keep it short and simple." 
        }
      ]
    }
  });

  const streamingResponse = await model.generateContentStream(prompt);
  // const text = streamingResponse.response.text();
  // console.log(text);
  console.log(streamingResponse);

  // return NextResponse.json({ content: text });
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}
