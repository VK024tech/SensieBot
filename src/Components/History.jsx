import React from "react";

export default function HistoryComponent() {
  function getFirstHistoryItems() {
    const historyItems = [];

    for (let i = 0; i < localStorage.length; i++) {
      try {
        const item = localStorage.getItem(localStorage.key(i));
        if (item) {
          const string = JSON.parse(item);
          if (
            Array.isArray(string) &&
            string.length > 0 &&
            string[0] &&
            string[0].text
          ) {
            const words = string[0].text;
            historyItems.push(
              <div key={i} className="bg-blue-200 p-2 m-2">
                {words.slice(0, 23) + "..."}
              </div>
            );
          }
        }
      } catch (error) {
        console.error("Error processing localStorage item:", error);
      }
    }
    return historyItems;
  }

  return (
    <div className="mt-14 max-w-62 fixed z-10" style={{ height: 'calc(100vh - 3.5rem)' }}>
      <section className="backdrop-blur-[3px] bg-[#8EC5FF70] flex flex-col h-full">
        <h1 className="text-gray-800 p-2 items-center font-semibold flex flex-row text-xl bg-blue-300">
          <i className="text-gray-800 text-xl mr-2 fa-solid fa-clock-rotate-left"></i>
          <span>History</span>
        </h1>
        <div className="overflow-y-auto">
          {getFirstHistoryItems()}
        </div>
      </section>
    </div>
  );
}