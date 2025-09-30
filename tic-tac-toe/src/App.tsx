import { useEffect, useState } from "react";

function App() {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [xturn, setxturn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>();
  const [isdisabled, setisdisabled] = useState<boolean>(false);

  const handleclick = (index: number) => {
    if (cells[index]) return;
    const newcells = [...cells];
    newcells[index] = xturn ? "X" : "O";
    setCells(newcells);
    setxturn(!xturn);
  };

  const winningcomb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  useEffect(() => {
    for (let [a, b, c] of winningcomb) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a]);
        setisdisabled(true);
        return;
      }
    }
    if (cells.every((cell) => cell)) {
      setWinner("Draw");
      setisdisabled(true);
    }
  }, [cells]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "column",
        background: "linear-gradient(to bottom,#7e7ed1,lightblue)",
        padding: "30px",
        margin: "0 500px",
        fontFamily:"cursive"
      }}
    >
      <h2 style={{margin:"0"}}>Tic Tac Toe</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {winner && <h2>Winner : {winner}</h2>}
        <button
          onClick={() => {
            setCells(Array(9).fill(""));
            setisdisabled(false);
            setxturn(true);
            setWinner("");
          }}
          style={{
            backgroundColor: "#d03f3fff",
            color: "white",
            margin: "30px",
            boxShadow:"4px 4px black"
          }}
        >
          Reset
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,100px)",
          gridTemplateRows: "repeat(3,100px)",
        }}
      >
        {cells.map((item, index) => (
          <button
            key={index}
            disabled={isdisabled}
            style={{
              border: "1px solid",
              font: "black",
              backgroundColor: "darkblue",
              color: "white",
              fontSize: "24px",
              cursor: winner ? "not-allowed" : "pointer",
            }}
            onClick={() => handleclick(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <h2>{!winner && (xturn ? `X's Turn` : "O's Turn")}</h2>
    </div>
  );
}

export default App;
