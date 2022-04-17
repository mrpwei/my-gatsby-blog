import * as React from "react";
import { container } from "./grail-layout.module.css";
import Layout from "./layout";
import styled from "styled-components";

const Center = styled.div`
  flex: 1;
  background: rgb(206, 201, 201);
  max-width: 750px;
`;
const Left = styled.div`
  width: 200px;
  background: rgba(95, 179, 235, 0.972);
`;
const Right = styled.div`
  width: 150px;
  background: rgb(231, 105, 2);
`;

const GrailLayout = ({ title, children }) => {
  return (
    <Layout pageTitle={title}>
      <div className={container}>
        <Left>Category</Left>
        <Center />
        <Right />
      </div>
    </Layout>
  );
};

export default GrailLayout;
