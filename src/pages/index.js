import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this website by tutorial</p>
      <StaticImage
        alt="dog"
        src="https://img.freepik.com/free-photo/group-portrait-adorable-puppies_53876-64778.jpg?w=1060&t=st=1649945698~exp=1649946298~hmac=65b55ab7d99d3dc581cb13c61034ef0e512d4c82783e465ad37b6ea14547d3bd"
      />
    </Layout>
  );
};

export default IndexPage;
