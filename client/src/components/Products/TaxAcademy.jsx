import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TaxAcademy = () => {
  useEffect(() => {
    // Load Voiceflow Chatbot
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: "65e88a02905ec742d67e77d2" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        render: {
          mode: "embedded",
          target: document.getElementById("chatbot"),
        },
        autostart: false,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Tax Academy!
        </h1>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tax-trivia" className="hover:text-gray-300">
                Tax Trivia
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow p-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Tax Chatbot</h2>
          <p className="mb-6">
            Welcome to our Tax Chatbot that can help you with your tax
            questions. Please interact with our chatbot below to get assistance.
          </p>
          <div
            id="chatbot"
            className="w-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg p-4"
          >
            {/* Chatbot will be rendered here */}
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Tax Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default TaxAcademy;
