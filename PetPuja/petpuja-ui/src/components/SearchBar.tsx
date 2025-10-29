import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledSpan = styled.span<{ selected?: boolean;}>`
  display: block;
  background-color: ${(props) => (props.selected ? "grey" : "white")};
  &:hover {
    background-color: grey;
    cursor: pointer;
    color: white;
  }
`;

const SearchBar = () => {
  const [result, setResult] = useState<any[]>([]);
  const [input, setinput] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [cache, setcache] = useState<any>({});
  const [selectedIndex, setselectedIndex] = useState<number>(-1);
  const itemrefs = useRef<any[]>([]);

  const fetchData = () => {
    if (cache[input]) {
      console.log("cache result");

      setResult(cache[input]);
      return;
    }

    fetch("https://dummyjson.com/recipes/search?q=" + input)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.recipes);
        setcache({ ...cache, [input]: data.recipes });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemrefs.current[selectedIndex]) {
      itemrefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);
  const handlekeypress = (e: any) => {
    if (!result.length) return;
    if (e.key == "ArrowDown" && selectedIndex < result.length - 1) {
      console.log("event is ", e.key);
      setselectedIndex(selectedIndex + (1 % result.length));
    } else if (e.key == "ArrowUp" && selectedIndex > 0) {
      console.log("event is ", e.key);
      setselectedIndex((selectedIndex - 1 + result.length) % result.length);
      
    }else if(e.key=="Enter") {
        setinput(result[selectedIndex].name)
      }
  };

  return (
    <div>
      <h1> Search Bar Demo</h1>
      <input
        type="text"
        placeholder="enter text for search"
        style={{ width: "500px", padding: "5px", boxSizing: "border-box" }}
        onChange={(e) => {
          setinput(e.target.value);
          setselectedIndex(-1);
        }}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        onKeyDown={(e) => handlekeypress(e)}
      />
      {showResults && (
        <div
          style={{
            border: "1px solid black",
            width: "500px",
            margin: "auto",
            maxHeight: "400px",
            overflowY: "scroll",
            boxSizing: "border-box",
          }}
        >
          {result.map((i, index) => (
            <StyledSpan
              key={index}
              selected={index == selectedIndex}
              ref={(el: any) => (itemrefs.current[index] = el)}
            >
              {i.name}
            </StyledSpan>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
