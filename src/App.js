import "./styles.css";
import { useEffect, useState } from "react";
import TransitionsModal from "./TransitionsModal";

// const flickr = {
//   api: "ea269524e985c81c50256848c6fc81f8",
//   secret: "f12475c097226480"
// };

export default function App() {
  const [state, setstate] = useState([]);
  const [searchterm, setsearchterm] = useState("");

  async function func(p) {
    let res = await fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ea269524e985c81c50256848c6fc81f8&format=json&nojsoncallback=1&text=cats&extras=url_o"
    );
    let user = await res.json();
    if (p === 1) {
      let resul = [...state, ...user.photos.photo];
      setstate(resul);
    }
    setstate(user.photos.photo);
  }
  useEffect(() => {
    func();
  });

  return (
    <div className="parent">
      <div className="App">
        <h1>ReactJS Assignment</h1>
      </div>
      <div id="id">
        <div className="block">
          <h2>Search Photos</h2>
          <input
            className="search"
            placeholder="Search..."
            onChange={(e) => setsearchterm(e.target.value)}
          />
        </div>
      </div>
      <div className="list">
        {state
          .filter((val) => {
            if (searchterm === null) {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchterm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((s, key) => (
            <TransitionsModal>
              <img
                src={s.url_o !== undefined ? s.url_o : null}
                alt="pic"
                width="250px"
                key={key}
              />
            </TransitionsModal>
          ))}
      </div>
    </div>
  );
}
