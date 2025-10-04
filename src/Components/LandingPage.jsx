import { useNavigate, useLoading } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios'

export default function HomePage() {
    const navigate = useNavigate();
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

    return (
        <>
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: 'rgb(253, 252, 218)', margin: '0 auto', padding: '0', height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <h3 className="mb-4 px-3">Hey there! 👋 You’ve made it to my corner of the web. Are you looking to hire me 💼 or here to make a new friend 🤝? Choose your path and let’s get started!</h3>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 d-flex flex-column align-items-center gap-4 mb-4">
                        {(                            <img
                                src="https://gmwqohructrttbxtggvq.supabase.co/storage/v1/object/public/Portfolio/Friend.jpg"
                                alt="Friend"
                                style={photoStyle}
                                loading="eager"
                                decoding="async"
                            />
                        )}
                        <div
                            className="bg-danger"
                            style={cardStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'}}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            onClick={() => navigate("/friend")}
                        >
                            Friend
                        </div>
                    </div>


                    <div className="col-12 col-md-5 d-flex flex-column align-items-center gap-4 mb-4">
                        {(
                            <img
                                src="https://gmwqohructrttbxtggvq.supabase.co/storage/v1/object/public/Portfolio/profile%20pic.jpeg"
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
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'}}
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