import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsLight";
import rangeParser from "parse-numeric-range";
import styled from "styled-components";

const calculateLinesToHighlight = (raw) => {
  const lineNumbers = rangeParser(raw);
  if (lineNumbers) {
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

const copyToClipboard = (str) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  } else if (window.clipboardData) {
    // Internet Explorer
    window.clipboardData.setData("Text", str);
  }
};

const Code = (props) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const className = props.children.props.className || "";
  const code = props.children.props.children.trim();
  const language = className.replace(/language-/, "");
  const file = props.children.props.file;
  const highlights = calculateLinesToHighlight(
    props.children.props.highlights || ""
  );

  const PreWrapper = styled.div`
    background: #fdfaf6;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    /* padding: 0 1.5rem; */
  `;

  const PreTitleWrapper = styled.div`
    display: flex;
    position: relative;
    height: 1.5rem;
    padding-left: 1.5rem;
  `;

  const LangLabel = styled.div`
    background: rgb(247, 223, 30);
    margin-right: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    text-transform: uppercase;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-family: Montserrat;
    font-size: 0.85rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const CodeFileName = styled.div`
    color: #866c5b;
    font-family: Montserrat;
    font-size: 0.9rem;
    /* height: 3rem; */
    line-height: 3rem;
    padding-left: 1.5rem;
  `;

  const CopyButton = styled.button`
    margin-right: 1.5rem;
    margin-top: 0.2rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: #635e69;
    font-size: 0.8rem;
    font-family: sans-serif;
    /* line-height: 1; */
    background: transparent;
    &:hover {
      color: #ffffff;
      background: #663399;
    }
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  `;

  const PreCodeWrapper = styled.div`
    overflow: auto;
    /* background: #011627; */
    border-radius: 0.5rem;
  `;

  const Pre = styled.pre`
    color: #36313d;
    /* background-color: transparent; */
    font-family: SFMono-Regular, Menlo, Monaco, Consolas;
    font-size: 0.85rem;
    line-height: 1.5rem;
    float: left;
    min-width: 100%;
    padding: 0 1.5rem;
  `;

  return (
    <PreWrapper>
      <CodeFileName>{file && `${file}`}</CodeFileName>
      <PreTitleWrapper>
        <LangLabel>{`${language}`}</LangLabel>
        <div style={{ flexGrow: "1" }}></div>
        <CopyButton
          onClick={() => {
            copyToClipboard(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
          }}
        >
          {isCopied ? "🎉 Copied!" : "Copy"}
        </CopyButton>
      </PreTitleWrapper>
      <PreCodeWrapper>
        <Highlight
          {...defaultProps}
          code={code}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className}>
              {tokens.map((line, i) => (
                <div
                  {...getLineProps({ line, key: i })}
                  style={{
                    background: highlights(i) ? "#fbf0ea" : "transparent",
                    // display: "block",
                    marginLeft: highlights(i) ? "-1.5rem" : "0",
                    paddingLeft: highlights(i) ? "1.25rem" : "0",
                    borderLeft: highlights(i)
                      ? "0.25rem solid #f1beb6"
                      : "none",
                  }}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Pre>
          )}
        </Highlight>
      </PreCodeWrapper>
    </PreWrapper>
  );
};

export default Code;
