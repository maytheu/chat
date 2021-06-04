import React from "react";
import Header from "./layout/Header";
import Room from "./layout/Room";

const Homepage = () => {
  return (
    <div>
      <Header />
      <section>
          <Room/>
          <Room/>
          <Room/>
          <Room/>
      </section>
    </div>
  );
};

export default Homepage;
