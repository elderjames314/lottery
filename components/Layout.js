import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


export default (pros) => {
  return (
    <div>
      <Container>
        <Header />

        {pros.children}
      </Container>
    </div>
  );
};
