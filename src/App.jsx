import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./Componats/pagas/Home";
import About from "./Componats/pagas/About";
import Layout from "./Componats/pagas/Layout";
import Users from "./Componats/pagas/Users";
import Todo from "./Componats/pagas/Todo";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}>
          About
        </Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/todo" element={<Todo/>}></Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
