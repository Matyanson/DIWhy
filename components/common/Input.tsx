import * as React from "react";

interface Props{
    type?: string,
}

function Input({type = "text", ...rest} : Props ) {
  return (
    <>
        <input type={type} {...rest}/>
        <style jsx>{`
        input[type=text], select {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        `}</style>
    </>
  );
}

export default Input;
