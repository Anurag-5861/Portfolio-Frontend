// import  { useState,useEffect } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios"
// export default function Headers() {
//   const [active, setActive] = useState("home");
//   const [hovered, setHovered] = useState(null);
//   const [resumeUrl, setResumeUrl] = useState("");
//   useEffect(() => {
//     api.get("/storage")
//       .then((res) => {
//         setResumeUrl(res.data.resume_url);
//       })
//       .catch((err) => {
//         console.error("Error while trying to fetch resume: ", err);
//       });
//   }, []);
//   const navStyle = {
//     backgroundColor: "#1c1c1c",
//     padding: "1rem 0",
//     display: "flex",
//     justifyContent: "center",
//   };

//   const ulStyle = {
//     listStyle: "none",
//     display: "flex",
//     gap: "1rem",
//     margin: 0,
//     padding: 0,
//     alignItems: "center",
//   };

//   const linkStyle = {
//     color: "#ffffff",
//     fontWeight: 500,
//     textDecoration: "none",
//     padding: "0.5rem 1.5rem",
//     borderRadius: "50px",
//     transition: "all 0.3s ease",
//     cursor: "pointer",
//   };

//   const activeStyle = {
//     ...linkStyle,
//     backgroundColor: "#61dafb",
//     color: "#000000",
//   };

//   return (
//     <nav style={navStyle}>
//       <ul style={ulStyle}>
//         <li>
//           <Link
//             to="/home"
//             style={active === "home" || hovered === "home" ? activeStyle : linkStyle}
//             onClick={() => setActive("home")}
//             onMouseEnter={() => setHovered("home")}
//             onMouseLeave={() => setHovered(null)}
//           >
//             Home
//           </Link>
//         </li>
        
//         <li style={{ position: "relative" }}>
//           <span
//             style={active === "contact me" || hovered === "contact me" ? activeStyle : linkStyle}
//             onMouseEnter={() => setHovered("contact me")}
//             onMouseLeave={() => setHovered(null)}
//           >
//             Contact Me ▾
//           </span>

//           <div
//             style={{
//               position: "absolute",
//               top: "120%",
//               left: "50%",
//               transform: "translateX(-50%)",
//               backgroundColor: "#262626",
//               padding: "1rem",
//               borderRadius: "12px",
//               display: hovered === "contact me" ? "block" : "none",
//               minWidth: "220px",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
//               textAlign: "left",
//               zIndex: 100,
//             }}
//             onMouseEnter={() => setHovered("contact me")}
//             onMouseLeave={() => setHovered(null)}
//           >
//             <div style={{ marginBottom: "0.5rem", color: "#61dafb", fontWeight: "600" }}>
//               📧 Email
//             </div>
//             <div style={{ color: "#ffffff", marginBottom: "0.75rem" }}>anuragvermadev25@gmail.com</div>

//             <div style={{ marginBottom: "0.5rem", color: "#61dafb", fontWeight: "600" }}>
//               📞 Phone
//             </div>
//             <div style={{ color: "#ffffff" }}>+91 9112314741</div>
//           </div>
//         </li>

//         <li>
//           <a
//             href={resumeUrl}
//             target="_blank"         
//             rel="noopener noreferrer"
//             style={hovered === "resume" ? activeStyle : linkStyle}
//             onMouseEnter={() => setHovered("resume")}
//             onMouseLeave={() => setHovered(null)}
//           >
//             Resume
//           </a>
//         </li>

//         <li>
//           <Link
//             to="/logout"
//             style={active === "logout" || hovered === "logout" ? activeStyle : linkStyle}
//             onClick={() => {setActive("logout",localStorage.clear())}}
//             onMouseEnter={() => setHovered("logout")}
//             onMouseLeave={() => setHovered(null)}
//           >
//             Logout
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Headers() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/storage")
      .then((res) => {
        setResumeUrl(res.data.resume_url);
      })
      .catch((err) => {
        console.error("Error while trying to fetch resume: ", err);
      });
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // ✅ Clear any stored tokens
      localStorage.removeItem("token");
      sessionStorage.removeItem("accessToken");

      // ✅ Redirect to login page
      navigate("/login");
    }
  };

  const navStyle = {
    backgroundColor: "#1c1c1c",
    padding: "1rem 0",
    display: "flex",
    justifyContent: "center",
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const linkStyle = {
    color: "#ffffff",
    fontWeight: 500,
    textDecoration: "none",
    padding: "0.5rem 1.5rem",
    borderRadius: "50px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const activeStyle = {
    ...linkStyle,
    backgroundColor: "#61dafb",
    color: "#000000",
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link
            to="/home"
            style={active === "home" || hovered === "home" ? activeStyle : linkStyle}
            onClick={() => setActive("home")}
            onMouseEnter={() => setHovered("home")}
            onMouseLeave={() => setHovered(null)}
          >
            Home
          </Link>
        </li>

        <li style={{ position: "relative" }}>
          <span
            style={active === "contact me" || hovered === "contact me" ? activeStyle : linkStyle}
            onMouseEnter={() => setHovered("contact me")}
            onMouseLeave={() => setHovered(null)}
          >
            Contact Me ▾
          </span>

          <div
            style={{
              position: "absolute",
              top: "120%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#262626",
              padding: "1rem",
              borderRadius: "12px",
              display: hovered === "contact me" ? "block" : "none",
              minWidth: "220px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
              textAlign: "left",
              zIndex: 100,
            }}
            onMouseEnter={() => setHovered("contact me")}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ marginBottom: "0.5rem", color: "#61dafb", fontWeight: "600" }}>
              📧 Email
            </div>
            <div style={{ color: "#ffffff", marginBottom: "0.75rem" }}>
              anuragvermadev25@gmail.com
            </div>

            <div style={{ marginBottom: "0.5rem", color: "#61dafb", fontWeight: "600" }}>
              📞 Phone
            </div>
            <div style={{ color: "#ffffff" }}>+91 9112314741</div>
          </div>
        </li>

        <li>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={hovered === "resume" ? activeStyle : linkStyle}
            onMouseEnter={() => setHovered("resume")}
            onMouseLeave={() => setHovered(null)}
          >
            Resume
          </a>
        </li>

        <li>
          <span
            style={active === "logout" || hovered === "logout" ? activeStyle : linkStyle}
            onClick={handleLogout}
            onMouseEnter={() => setHovered("logout")}
            onMouseLeave={() => setHovered(null)}
          >
            Logout
          </span>
        </li>
      </ul>
    </nav>
  );
}
