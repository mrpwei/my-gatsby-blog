import * as React from "react";
import Layout from "../../components/layout";
import { container } from "../../components/grail-layout.module.css";
import { Link, graphql } from "gatsby";

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

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Blog posts">
      <div className={container}>
        <Left>
          {data.allMdx.nodes.map((node) => (
            <article key={node.id}>
              <h2>
                <Link to={`/blog/${node.slug}`}>{node.frontmatter.title}</Link>
              </h2>
              <p>posted: {node.frontmatter.date}</p>
            </article>
          ))}
        </Left>
        <Center></Center>
        <Right />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date
          title
          tags
        }
        id
        slug
      }
    }
  }
`;

export default BlogPage;
