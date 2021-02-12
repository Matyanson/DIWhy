import Container from './Container';
import Button from './styled/Button';

const Test = ()=> {
  return (
    <div>
      <Container>
        <h2>Test container</h2>
        press the button! <Button>ADD</Button><br/>
        So.. how is your day?<br/>
        link for you to <a href="/">escape.</a>
      </Container>
      <style jsx>{`
      `}</style>
    </div>
  );
}

export default Test;