import React from "react";
import { TemplateDiv, Title, Container } from "./style.js";

const Template = ({ children }) => {
  return (
    <TemplateDiv>
      <Title>Haeun's TODOS</Title>
      <Container>{children}</Container>
    </TemplateDiv>
  );
};

export default Template;
