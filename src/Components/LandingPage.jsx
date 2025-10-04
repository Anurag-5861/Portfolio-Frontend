import { useNavigate, useLoading } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios'

export default function HomePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const jwtToken = localStorage.getItem("token");
    const photoStyle = {
        width: '20vw',
        height: '20vw',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid #fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#000',
    };

    const cardStyle = {
        width: '18vw',
        height: '15vw',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '1.2rem',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
    };

    // const prefetchFriendData = async () => {
    //     if (!friendData) {
    //         try {
    //             const jwtToken = localStorage.getItem("token");
    //             const response = await api.get("/friend", {
    //                 headers: { Authorization: `Bearer ${jwtToken}` },
    //             });
    //             setFriendData(response.data[0]);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };

    // const prefetchRecruiterData = async () => {
    //     if (!recruiterData) {
    //         try {
    //             const jwtToken = localStorage.getItem("token");
    //             const response = await api.get("/recuiter", {
    //                 headers: { Authorization: `Bearer ${jwtToken}` },
    //             });
    //             setRecruiterData(response.data[0]);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     api.get("/storage")
    //         .then((res) => {
    //             setFriendPhoto(res.data.friend_photo_url);
    //             setRecruiterPhoto(res.data.recuiter_photo_url);
    //         })
    //         .catch((err) => console.error("Error fetching photos:", err));
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [friendRes, recruiterRes] = await Promise.all([
                    api.get("/friend",{
                        headers: {Authorization: `Bearer ${jwtToken}`}
                    }),
                    api.get("/recuiter",{
                        headers: {Authorization: `Bearer ${jwtToken}`}
                    }),
                ]);
                const friendData = friendRes.data[0];
                const recruiterData = recruiterRes.data[0];
                localStorage.setItem("recruiterData", JSON.stringify(recruiterData));
                localStorage.setItem("friendData", JSON.stringify(friendData));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    // useEffect(() => {
    //     const fetchAll = async () => {
    //         try {
    //             const [storageRes, friendRes, recruiterRes] = await Promise.all([
    //                 api.get("/storage"),
    //                 api.get("/friend"),//, { headers: { Authorization: `Bearer ${token}` }
    //                 api.get("/recuiter"),//, { headers: { Authorization: `Bearer ${token}` } }
    //             ]);

    //             setFriendPhoto(storageRes.data.friend_photo_url);
    //             setRecruiterPhoto(storageRes.data.recuiter_photo_url);
    //             setFriendData(friendRes.data[0]);
    //             setRecruiterData(recruiterRes.data[0]);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAll();
    // }, []);
    return (
        <>
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: 'rgb(253, 252, 218)', margin: '0 auto', padding: '0', height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <h3 className="mb-4 px-3">Hey there! 👋 You’ve made it to my corner of the web. Are you looking to hire me 💼 or here to make a new friend 🤝? Choose your path and let’s get started!</h3>


                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 d-flex flex-column align-items-center gap-4 mb-4">
                        {(                            <img
                                src="https://gmwqohructrttbxtggvq.supabase.co/storage/v1/object/public/Portfolio/Friend.jpg"//{friendPhoto}
                                alt="Friend"
                                style={photoStyle}
                                loading="eager"
                                decoding="async"
                            />
                        )}
                        <div
                            className="bg-danger"
                            style={cardStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'}}//; prefetchFriendData(); 
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            onClick={() => navigate("/friend")}
                        >
                            Friend
                        </div>
                    </div>


                    <div className="col-12 col-md-5 d-flex flex-column align-items-center gap-4 mb-4">
                        {(
                            <img
                                src="https://gmwqohructrttbxtggvq.supabase.co/storage/v1/object/public/Portfolio/profile%20pic.jpeg"//{recruiterPhoto}
                                alt="Recruiter"
                                style={photoStyle}
                                loading="eager"
                            />
                        )}
                        <div
                            className="bg-primary"
                            style={{
                                ...cardStyle,
                                backgroundColor: "#53eff7ff",
                                transition: "transform 0.3s ease",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'}}// ; prefetchRecruiterData();
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            onClick={() => navigate("/recuiter")}
                        >
                            Recruiter
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import api from "../api/axios";

// export default function HomePage() {
//   const navigate = useNavigate();
//   const [friendData, setFriendData] = useState(null);
//   const [recruiterData, setRecruiterData] = useState(null);
//   const [friendPhoto, setFriendPhoto] = useState(null);
//   const [recruiterPhoto, setRecruiterPhoto] = useState(null);

//   const photoStyle = {
//     width: "20vw",
//     height: "20vw",
//     borderRadius: "50%",
//     objectFit: "cover",
//     border: "4px solid #fff",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//     backgroundColor: "#000",
//   };

//   const cardStyle = {
//     width: "18vw",
//     height: "15vw",
//     borderRadius: "12px",
//     fontWeight: "600",
//     fontSize: "1.2rem",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     cursor: "pointer",
//   };

//   const prefetchFriendData = async () => {
//     if (!friendData) {
//       try {
//         const jwtToken = localStorage.getItem("token");
//         const response = await api.get("/friend", {
//           headers: { Authorization: `Bearer ${jwtToken}` },
//         });
//         setFriendData(response.data[0]);
//       } catch (err) {
//         console.error("Error fetching friend data:", err);
//       }
//     }
//   };

//   const prefetchRecruiterData = async () => {
//     if (!recruiterData) {
//       try {
//         const jwtToken = localStorage.getItem("token");
//         const response = await api.get("/recruiter", {
//           headers: { Authorization: `Bearer ${jwtToken}` },
//         });
//         setRecruiterData(response.data[0]);
//       } catch (err) {
//         console.error("Error fetching recruiter data:", err);
//       }
//     }
//   };

//   // Load photo URLs once on mount
//   useEffect(() => {
//     api
//       .get("/storage")
//       .then((res) => {
//         setFriendPhoto(res.data.friend_photo_url || null);
//         setRecruiterPhoto(res.data.recruiter_photo_url || null);
//       })
//       .catch((err) => {
//         console.error("Error fetching photos:", err);
//       });
//   }, []);

//   return (
//     <div
//       className="container-fluid py-5 text-center"
//       style={{
//         backgroundColor: "rgb(253, 252, 218)",
//         margin: "0 auto",
//         padding: "0",
//         height: "100vh",
//         width: "100vw",
//         overflow: "hidden",
//       }}
//     >
//       <h3 className="mb-4 px-3">
//         Hey there! 👋 You’ve made it to my corner of the web. Are you looking to
//         hire me 💼 or here to make a new friend 🤝? Choose your path and let’s
//         get started!
//       </h3>

//       <div className="row justify-content-center">
//         {/* Friend Section */}
//         <div className="col-12 col-md-5 d-flex flex-column align-items-center gap-4 mb-4">
//           {friendPhoto && (
//             <img src={friendPhoto} alt="Friend" style={photoStyle} />
//           )}
//           <div
//             className="bg-danger"
//             style={cardStyle}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05)";
//               e.currentTarget.style.boxShadow = "0px 6px 18px rgba(0,0,0,0.2)";
//               prefetchFriendData();
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//               e.currentTarget.style.boxShadow = "none";
//             }}
//             onClick={() => navigate("/friend")}
//           >
//             Friend
//           </div>
//         </div>

//         {/* Recruiter Section */}
//         <div className="col-12 col-md-5 d-flex flex-column align-items-center gap-4 mb-4">
//           {recruiterPhoto && (
//             <img src={recruiterPhoto} alt="Recruiter" style={photoStyle} />
//           )}
//           <div
//             style={{
//               ...cardStyle,
//               backgroundColor: "#53eff7ff",
//               color: "#000",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05)";
//               e.currentTarget.style.boxShadow = "0px 6px 18px rgba(0,0,0,0.2)";
//               prefetchRecruiterData();
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//               e.currentTarget.style.boxShadow = "none";
//             }}
//             onClick={() => navigate("/recruiter")}
//           >
//             Recruiter
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
