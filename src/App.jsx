import { useState } from "react";

import WelcomeScreen from "./components/welcomescreen";

function App() {
  const [language, setLanguage] = useState("en");

  return (
    <WelcomeScreen
      language={language}
      onLanguageChange={setLanguage}
      onGetStarted={() => alert("Get Started Clicked!")}
    />
  );
}

export default App;
