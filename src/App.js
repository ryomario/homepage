import WallClock from "./apps-top/wall-clock/WallClock";
import Menu from "./menus/Menu";

function App() {
  return (
    <div className="app">
      <section className="app-top">
        <WallClock/>
      </section>
      <hr/>
      <Menu/>
    </div>
  );
}

export default App;
