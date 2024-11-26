import React from "react";
import Logo from "./components/Logo";
import Advertisement from "./components/Advertisement";
import LoginForm from "./components/LoginForm";
import Reviews from "./components/Reviews";

const Page = () => (
  <div className="pageContainer">
    <div className="contentContainer">
      <div className="leftColumn">
        <Logo />
        <Advertisement />
        <Reviews />
      </div>
      <div className="rightColumn">
        <LoginForm />
      </div>
    </div>
  </div>
);

export default Page;