import React, { useEffect, useRef, useState } from "react";
import ApiFunctionality from "./ApiFunctionality";
import { v4 as uuidv4 } from "uuid";

export default function Body({
  userMesssage,
  userText,
  setUserText,
  aiMesssage,
  setAiText,
  aiText,
  messages,
  setMessages,
  loading,
  setLoading,
  writeKey,
  setNewQuery,
  newQuery,
}) {
  const initialMount = useRef(true);
  const [startTyping, setStartTyping] = useState(false);
  const [emptyBClicked, setEmptyBClicked] = useState(false);
  const [storageKey, setStorageKey] = useState("");
  let key;
  ////session id/////
  useEffect(() => {
    if (localStorage.length > 0) {
      // console.log(localStorage.length)
      key = localStorage.key((localStorage.length) -1 );
    } else {
      key = uuidv4();
      // console.log(key);
    }

    setStorageKey(key);
    // console.log(storageKey)

    try {
      const storedData = localStorage.getItem(key);
      const data =
        storedData && storedData.length > 0 ? JSON.parse(storedData) : [];
      setMessages(data);
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      setMessages([]);
    }
  }, []);

  function storageHandling() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error("error storind msg:", error);
    }

    clearEmptyArrays();
  }

  useEffect(() => {
    storageHandling();
  }, [messages]);


  ////newquery

  useEffect(()=>{
    if(newQuery===true){
      // console.log(newQuery)
      const newKey = uuidv4()
      setMessages([])
      setStorageKey(newKey)
      // localStorage.removeItem(storageKey)
      // key=writeKey
      // setMessages([])
      // setStorageKey(key)
      // console.log("new key :", newKey);
      setNewQuery=false
      // window.location.reload();
    }
  },[newQuery])

  ////clear empty

  const clearEmptyArrays = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);
      try {
        const parsedItem = JSON.parse(item);
        if (Array.isArray(parsedItem) && parsedItem.length === 0) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        // console.log("error");
      }
    }
  };

  const handleApi = async () => {
    try {
      setLoading(true);

      const result = await ApiFunctionality(userMesssage);
      // console.log(result);
      setAiText(result.candidates[0].content.parts[0].text);
    } catch (error) {
      const aiResponse = {
        sender: "Ai",
        text: "Something went wrong!",
      };
      setMessages((prevMessage) => [...prevMessage, aiResponse]);
    }
  };

  const handleMessages = async () => {
    if (userText.trim()) {
      const userMesssage = { sender: "user", text: userText };
      setMessages((prevMessage) => [...prevMessage, userMesssage]);
      setUserText("");
    }
  };

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      // console.log("apiarraystart");
      try {
        if (aiText) {
          const aiResponse = { sender: "Ai", text: aiText };
          setLoading(false);
          setMessages((prevMessage) => [...prevMessage, aiResponse]);
        } else if (aiText !== null && aiText !== "") {
          // console.log(aiText);
          const aiResponse = {
            sender: "Ai",
            text: "Sorry! I could not process your request",
          };
          setMessages((prevMessage) => [...prevMessage, aiResponse]);
        }
      } catch (error) {
        const aiResponse = {
          sender: "Ai",
          text: "Something went wrong!",
        };
        setMessages((prevMessage) => [...prevMessage, aiResponse]);
      } finally {
        setLoading(false);
      }
    }
  }, [aiText]);

  function button() {
    if (userText.length > 0) {
      return (
        <button
          onClick={() => {
            setEmptyBClicked(false);
            handleMessages();
            handleApi();
          }}
          className="bg-gray-300  [@media(width<768px)]:bg-gradient-to-br [@media(width<768px)]:from-green-200 [@media(width<768px)]:to-green-400 p-2 px-3 rounded-xl cursor-pointer outline-none hover:bg-gradient-to-br from-green-200 to-green-400"
        >
          <i className="text-2xl fa-regular fa-paper-plane text-white"></i>
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            setEmptyBClicked(true);
            // console.log(emptyBClicked)
          }}
          className="bg-gray-300 p-2 px-3 rounded-xl cursor-pointer  outline-none  [@media(width<768px)]:bg-gradient-to-br [@media(width<768px)]:from-green-200 [@media(width<768px)]:to-green-400    hover:bg-gradient-to-br  from-red-100 to-red-300"
        >
          <i className="text-2xl fa-regular fa-paper-plane text-white"></i>
        </button>
      );
    }
  }

  return (
    <main className="w-full fixed h-dvh justify-end flex flex-col mb-12 m-auto  ">
      {/* <h1 className="p-2 text-2xl font-medium   text-gray-800">
        Hii,{" "}
        <span className="moving text-transparent bg-clip-text font-bold">
          Vivek!
        </span>
        <br /> How can i help you?
      </h1> */}
      <div className=" p-4 mb-2  [@media(width>600px)]:mb-8  ">
        <div
          className={` bg-gray-50 p-2 flex justify-between mx-auto items-center w-auto sm:w-xl  rounded-2xl border-2 border-blue-200 shadow-blue-500/40 shadow-[0px_4px_15px] min-h-16 h-auto max-h-32 md:min-h-14 md:min-w-2xl !outline-none transition-shadow  duration-800   ease-in-out ${
            emptyBClicked
              ? " border-red-300 shadow-red-600/80 shadow-[0px_4px_15px]"
              : startTyping && userText.length > 0
              ? " border-blue-300 shadow-blue-600/80 shadow-[0px_4px_15px]"
              : ""
          } `}
        >
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (userText.length > 0) {
                  setEmptyBClicked(false);
                  handleMessages();
                  handleApi();
                } else {
                  setEmptyBClicked(true);
                }
              }
            }}
            onBlur={() => {
              setStartTyping(false);
            }}
            onInput={() => {
              setStartTyping(true);
              setEmptyBClicked(false);
              // console.log(emptyBClicked)
            }}
            onClick={() => {
              setStartTyping(true);
            }}
            id="userInput"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            className="w-full m-1 [@media(width<400px)]:text-sm  bg-gray-50 h-auto p-2 !outline-none placeholder-gray-500  text-wrap"
            autoComplete="off"
            type="text"
            placeholder="Feel free to ask me anything..."
          />
          {button()}
        </div>
      </div>
    </main>
  );
}
