import { useState } from "react";
import quests from "./quests.json";
import "./App.css";
import wandImg from "./assets/wand.svg";

function App() {
  const [questIndex, setQuestIndex] = useState<number | null>(null);
  const [displayedQuests, setDisplayedQuests] = useState<number[]>([]);

  const generateQuest = () => {
    let questId = getRandomNumber();
    const questSet = new Set(displayedQuests);

    // make sure there are no duplicate questIds generated
    while (
      questSet.has(questId) &&
      displayedQuests.length !== quests.quests.length
    ) {
      questId = getRandomNumber();
    }

    setQuestIndex(questId);
    setDisplayedQuests((prev) => [...prev, questId]);
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 50);
  };

  return (
    <div id="container">
      <div>
        <h1>Questify 🧙‍♂️</h1>
        <h3>Looking for a quest for the week?</h3>
        {/* <p>Look no further!</p> */}
        <button onClick={generateQuest} id="quest-btn" key={questIndex}>
          <img src={wandImg} style={{ width: `25px` }} />
          <p>Generate Weekly Quest</p>
        </button>
        {questIndex !== null &&
          displayedQuests.length !== quests.quests.length && (
            <h2 className="quest-icon" key={quests.quests[questIndex].icon}>
              <span style={{ display: "block" }}>
                {quests.quests[questIndex].icon}{" "}
              </span>
              <span>{"  " + quests.quests[questIndex].title}</span>
            </h2>
          )}
        {displayedQuests.length === quests.quests.length && (
          <>
            <h2>Um... the wizard is all out of quests... 🤷</h2>
            <p>Pick something from the 50 you've already generated.</p>
          </>
        )}
      </div>

      {displayedQuests.length > 0 && (
        <div
          style={{
            backgroundColor: "#ffd3c4",
            padding: "5px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <h4>Generated Quests</h4>
          <ol style={{ textAlign: "left" }}>
            {displayedQuests.map((questId) => (
              <li key={`generated-quest-${questId}`} className="quest-entry">
                {quests.quests[questId].title} {quests.quests[questId].icon}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
