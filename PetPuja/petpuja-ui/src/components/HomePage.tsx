
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function HomePage() {
 const [activeForm,setactiveForm]=useState("login")
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src="https://b.zmtcdn.com/data/file_assets/2627bbed9d6c068e50d2aadcca11ddbb1743095925.mp4"
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "50px", marginBottom: "10px", color: "white" }}>
          PetPuja
        </h1>
        <h3 style={{ fontSize: "20px", marginBottom: "20px", color: "white" }}>
          Hungry? Let the Puja Begin!
        </h3>
      </div>

      {/* Improved Login Form */}
      {activeForm==="login"?<Login setactiveForm={setactiveForm}/>:<Register setactiveForm={setactiveForm}/>}
    </div>
  );
}

export default HomePage;
