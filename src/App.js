import "./styles.css";
import { useEffect, useState } from "react";
import TransitionsModal from "./TransitionsModal";
import InfiniteScroll from "react-infinite-scroll-component";

/* const flickr = {
   api: "ea269524e985c81c50256848c6fc81f8",
   secret: "f12475c097226480"
 };*/

export default function App() {
  const [state, setstate] = useState([]);
  const [searchterm, setsearchterm] = useState("");
  const [list, setlist] = useState([]);

  //async function for fetching an api
  async function func() {
    let res = await fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ea269524e985c81c50256848c6fc81f8&format=json&nojsoncallback=1&text=cats&extras=url_o"
    );
    let user = await res.json();
    setTimeout(() => {
      setstate(user.photos.photo);
    }, 1500);
  }
  //keeping the fetch function in useeffect to render on page loading
  useEffect(() => {
    func();
  });

  //mapping and storing the input value to localstorage
  const handlechange = (e) => {
    setsearchterm(e.target.value);
    let t;
    localStorage.setItem("save", t);
    t = localStorage.getItem("save");
    setlist(t);
  };
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
            onChange={handlechange}
          />
        </div>
      </div>
      {/*---- Component used for infinite-scroll----- */}
      <InfiniteScroll
        dataLength={state.length}
        next={func}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className="list"
      >
        {/* <div className="list"> */}

        {/* ----- Output of the searched input ----- */}
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
              {/*--- material-ui used for making the picture pop up as a modal --- */}
              <img
                src={s.url_o !== undefined ? s.url_o : null}
                alt="pic"
                width="250px"
                key={key}
              />
            </TransitionsModal>
          ))}
      </InfiniteScroll>
    </div>
  );
}
