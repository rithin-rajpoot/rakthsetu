import React from "react";
import Header from "./Header";
import RequestList from "../request/RequestList";


const LandingPage = () => {
  return (
    <div className='h-full min-h-screen'>
    <Header />
    <RequestList />
    </div>
  );
};

export default LandingPage;
