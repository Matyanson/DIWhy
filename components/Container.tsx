import { useContext } from 'react'
import { useTheme } from './ThemeProvider';
const Container = ({children})=>{
  const [{ neutral }] = useTheme();
    return (
        <>
            <div className="container">
                {children}
                <style jsx >{`
                .container{
                    background: ${neutral};
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