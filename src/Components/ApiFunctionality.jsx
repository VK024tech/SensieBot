import axios from "axios";
import React from "react";

export default async function ApiFunctionality(a) {
try{

  const response = await axios({
    method: "post",
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAlKboZ6LpO8Y4n2MVTnMkBLGTEMnlbjSQ`,
    data: {
      contents: [
        {
          parts: [{ text: a }],
        },
      ],
    },
  })
  // console.log(response.data)
  return response.data
}catch(error){
  // console.log('error')
  return null
}
}