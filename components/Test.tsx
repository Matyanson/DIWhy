import { useEffect, useState } from 'react';
import Container from './Container';
import Button from './styled/Button';

const Test = ({initValue = []}: {initValue: string[]})=> {

  const [value, setValue] = useState([]);
  const [value2, setValue2] = useState([]);


  useEffect(()=>{
    console.log("newval");
    setValue(initValue);
  }, [initValue])

  useEffect(()=>{
    setValue2(value);
  }, [value])

  return (
    <div>
      {value.map((x, index)=> {
        return <p key={index}>{x}</p>
      })}
      <style jsx>{`
      `}</style>
    </div>
  );
}

export default Test;