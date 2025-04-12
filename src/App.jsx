import { useState } from "react";
import Header from "./Components/Header";
import Body from "./Components/Home";
import Conversation from "./Components/Conversation";
import ApiFunctionality from "./Components/ApiFunctionality";
import History from "./Components/History";

function App() {
  ///////lifted from home////////////////
  const [userText, setUserText] = useState("");
  const userMesssage = userText;
  const [aiText, setAiText] = useState("");
  const aiMesssage = aiText;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  let writeKey;
  ///////lifted from home////////////////

  <ApiFunctionality userMesssage={userMesssage} />;

  return (
    <>
      <div className="flex flex-col mx-auto w-100dvw max-w-[1580px]">
        <section className=" flex min-h-screen flex-col bg-gradient-to-r from-white to-blue-50 ">
          <Header
            writeKey={writeKey}
            setNewQuery={setNewQuery}
            newQuery={newQuery}
            setMessages={setMessages}
          />
          <Body
            userText={userText}
            setUserText={setUserText}
            userMesssage={userMesssage}
            aiText={aiText}
            setAiText={setAiText}
            aiMesssage={aiMesssage}
            messages={messages}
            setMessages={setMessages}
            loading={loading}
            setLoading={setLoading}
            writeKey={writeKey}
            newQuery={newQuery}
            setNewQuery={setNewQuery}
          />
          <Conversation
            userText={userText}
            aiText={aiText}
            messages={messages}
            loading={loading}
            setLoading={setLoading}
          />
         
        </section>
      </div>
    </>
  );
}

export default App;
