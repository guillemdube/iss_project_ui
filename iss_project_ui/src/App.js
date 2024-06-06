import './App.css';
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import GlobalStyle from "carbon-react/lib/style/global-style";
import { sageTheme } from "carbon-react/lib/style/themes";
import Box from "carbon-react/lib/components/box";
import Router from './routes/routes';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CarbonProvider theme={sageTheme}>
          <GlobalStyle />
          <Router />    
        </CarbonProvider>
      </header>
    </div>
  );
}

export default App;
