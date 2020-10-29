import ThemeContext from './ThemeContext';
import { useContext } from 'react'
const Container = ({children})=>{
  const [{ container }] = useContext(ThemeContext);
    return (
        <>
            <div className="container">
                {children}
                <style jsx >{`
                .container{
                    background: ${container};
                    margin-top: 50px;
                    padding: 20px;
                    border-radius: 20px;
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    justify-content: start;
                    
                }
                `}</style>
            </div>
        </>
    );
}

export default Container;