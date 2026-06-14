import "./App.css";
import TodoList from "./Components/todoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[800],
      },
      secondary: {
        main: "#f44336",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <TodoList />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
