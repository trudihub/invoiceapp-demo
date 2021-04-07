
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home"
import InvoicePage from "./components/InvoicePage"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/invoice/:id" component={InvoicePage}/>
      </Switch>
      
    </Router>
  );
}

export default App;
