import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Code from "./code";

const components = {
  pre: (props) => {
    return <Code {...props} />;
  },
  wrapper: ({ children }) => <>{children}</>,
};

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
