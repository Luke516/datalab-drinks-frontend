import "./main.scss";
import DrinkCell from "./components/DrinkCell";
import DrinkList from "./components/DrinkList";
import AllDrinks from "./components/AllDrinks";

function App() {
  return (
    <div className="App">
      <div className="container">
          <AllDrinks/>
      </div>
    </div>
  );
}

export default App;
