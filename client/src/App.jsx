import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
//import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Nav from "./components/Nav/Nav.jsx";
import About from "./components/About/About.jsx";
//import characters from "./data.js";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Detail from "./components/Detail/Detail.jsx";
import Error from "./components/Error/Error.jsx";
import LoginView from "./views/LoginView.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";



function App() {
  const [characters, setCharacters] = useState([]);

  const [access, setAccess] = useState(false);

  const navigate = useNavigate();
  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const {data} = await axios(URL + `?email=${email}&password=${password}`);
      setAccess(data.access);
      access && navigate("/home");
    } catch (error) {
      window.alert("Usuario o contraseña incorrecta");
    }
  }
//   function login(userData) {
//     const { email, password } = userData;
//     const URL = 'http://localhost:3001/rickandmorty/login/';
//     axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
//        const { access } = data;
//        setAccess(data);
//        access && navigate('/home');
//     });
//  }

  // const EMAIL = "@mail.com";
  // const PASSWORD = "123asd";

  // const login = (userData) => {
  //   if (userData.email === EMAIL && userData.password === PASSWORD) {
  //     setAccess(true);
  //     navigate("/home");
  //   }
  // };

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  //const onClose = () => window.alert("Emulamos que se cierra la card");

  const { pathname } = useLocation();

  // async function onSearch(id) {
  //   try {
  //     const { data } = await axios(
  //       `http://localhost:3001/api/character/${id}`
  //     );
  //     setCharacters((oldChars) => [...oldChars, data]);
  //   } catch (error) {
  //     window.alert("¡No hay personajes con este ID!");
  //   }
  // }
  
  const onClose = (id) => {
    let filterCharacters = characters.filter((ch) => {
      return ch.id !== id;
    });
    //filtro de estado local en el que te quedes con personajes con id distinto al q recibes x parámetro
    setCharacters(filterCharacters);
  };

  function onSearch(id) {
    axios
      .get(`http://localhost:3001/rickandmorty/character/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      })
      .catch(error => {
        console.error('Error al buscar el personaje:', error);
        window.alert("¡Ocurrió un error al buscar el personaje!");
      });
  }

  return (
    <div className="App">
      {/* <SearchBar onSearch={(characterID) => window.alert(characterID)} /> */}

      <Routes>
        <Route path="/" element={<LoginView login={login} />} />
        <Route path="/*" element={<Error />} />
        <Route
          path="/home"
          element={
            <>
              <Nav onSearch={onSearch} />
              <Cards characters={characters} onClose={onClose} />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Nav onSearch={onSearch} />
              <About />
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              <Nav onSearch={onSearch} />
              <Detail />
            </>
          }
          />
          <Route
          path="/fav"
          element={
            <>
              <Nav onSearch={onSearch} />
              <Favorites />
            </>
          }
          />
        
        
      </Routes>

      {/* <Cards characters={characters} onClose={onClose} /> */}
    </div>
  );
}

export default App;
