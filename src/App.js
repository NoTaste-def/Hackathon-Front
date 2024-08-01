import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./font.css";
import "./header.css";
import "./footer.css";
import "./modal.css";

import AuthModal from "./components/AuthModal";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/home";
import MonthlyStats from "./pages/MonthlyStat";
import Steps from "./pages/Steps";
import StepSelection from "./pages/StepSelection";
import TodoBtn from "./components/TodoBtn";
import getCsrfToken from "./components/getCsrfToken";

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [selec, setSelec] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setEmail("");
    setPassword("");
    setError("");
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    closeLoginModal();
  };

  const closeSignupModal = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setNickname("");
    setError("");
    setIsSignupModalOpen(false);
  };

  const handleLogin = (profile) => {
    setUserProfile(profile);
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleSignup = () => {
    closeSignupModal();
  };

  useEffect(() => {
    const initializeCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    initializeCsrfToken();
  }, []);

  return (
    <>
      <Header onLoginClick={openLoginModal} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              openLoginModal={openLoginModal}
              userProfile={userProfile}
              isLoggedIn={isLoggedIn}
              selec={selec}
              setSelec={setSelec}
            />
          }
        />
        <Route
          path="/StepSelection"
          element={
            <StepSelection
              openLoginModal={openLoginModal}
              isLoggedIn={isLoggedIn}
              userProfile={userProfile}
              selec={selec}
              setSelec={setSelec}
            />
          }
        />
        <Route path="/Steps" element={<Steps />} />
        <Route path="/MonthlyStats" element={<MonthlyStats />} />
      </Routes>
      <Footer />
      <TodoBtn />
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        type="login"
        password={password}
        passwordConfirm={passwordConfirm}
        email={email}
        nickname={nickname}
        error={error}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handlePasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
        handleEmailChange={(e) => setEmail(e.target.value)}
        handleNicknameChange={(e) => setNickname(e.target.value)}
        handleSubmit={handleLogin}
        openSignupModal={openSignupModal}
        csrfToken={csrfToken}
        setCsrfToken={setCsrfToken}
      />
      <AuthModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        type="signup"
        password={password}
        passwordConfirm={passwordConfirm}
        email={email}
        nickname={nickname}
        error={error}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handlePasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
        handleEmailChange={(e) => setEmail(e.target.value)}
        handleNicknameChange={(e) => setNickname(e.target.value)}
        handleSubmit={handleSignup}
        csrfToken={csrfToken}
        setCsrfToken={setCsrfToken}
      />
    </>
  );
};

export default App;
