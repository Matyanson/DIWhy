import { useTheme } from './ThemeProvider';
import { useContext } from 'react'
import Container from './Container';
import Button from './styled/Button';

const ModalBox = ({title = "Are you sure?", onAction})=>{
  const [{ neutral }] = useTheme();
    return (
        <>
            <div className="modal">
                <Container>
                <>
                    <h1>{title}</h1>
                    <br/>
                    <div className="buttons">
                        <Button onClick={()=>onAction(true)}>YES</Button>
                        <Button onClick={()=>onAction(false)}>NO</Button>
                    </div>
                </>
                </Container>
                <style jsx >{`
                .modal{
                    position: fixed;
                    min-width: 50%;
                    min-height: 50%;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    margin: auto;
                    z-index: 20;
                }
                `}</style>
            </div>
        </>
    );
}

export default ModalBox;