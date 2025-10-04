
import { useState, useEffect } from "react";
import Headers from "./Headers";
import api from '../api/axios'

export default function FriendDetails() {
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cached = localStorage.getItem("friendData");

        if (cached) {
            setFriend(JSON.parse(cached));
            setLoading(false);
        } else {
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        console.error("Token is not present in localstorage");
                        return;
                    }

                    const friendRes = await api.get("/friend", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const friend = friendRes.data[0];
                    setFriend(friend);
                    localStorage.setItem("friendData", JSON.stringify(friend));

                } catch (error) {
                    console.error("Encountered an error while trying to fetch friends details: ", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, []);

    if (loading) return <p className="text-center mt-5">Loading... Patience is the Key.</p>;
    if (!friend) return <p className="text-center mt-5">Opps...No friend details available</p>;

    return (
        <>
            <div className="header">
                <Headers />
            </div>

            <div className="container py-5" style={{ maxWidth: "1200px" }}>
                <div className="card border-0 shadow-lg rounded-4 p-4" style={{ backgroundColor: 'rgba(209, 101, 108, 0.73)' }}>
                    <div className="text-center mb-4">
                        {
                            <img
                                src="https://gmwqohructrttbxtggvq.supabase.co/storage/v1/object/public/Portfolio/Friend.jpg"
                                alt={friend.name}
                                loading="eager"
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "4px solid #61dafb",
                                    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />
                        }
                        <h2 className="mt-3 fw-bold">{friend.name}</h2>
                        <p className="text-secondary mb-0">{friend.address}</p>
                    </div>

                    <div className="mb-4">
                        <h4 className="fw-semibold text-primary border-bottom pb-2">👨‍💻 About</h4>
                        <p className="mt-2" style={{ lineHeight: "1.6", color: "#444" }}>
                            {friend.about}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="fw-semibold text-success border-bottom pb-2">🎓 Education</h4>
                        <div className="d-flex overflow-auto pt-3 pb-2" style={{ gap: "1rem" }}>
                            {friend.education.sort((a, b) => b.endYear - a.endYear).map((edu, index) => (
                                <div
                                    key={index}
                                    className="card border-0 shadow-sm flex-shrink-0"
                                    style={{
                                        minWidth: "260px",
                                        maxWidth: "280px",
                                        borderRadius: "16px",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-6px)";
                                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.25)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
                                    }}
                                >
                                    <div className="card-body bg-light rounded-4">
                                        <h6 className="text-primary fw-bold">{edu.degree}</h6>
                                        <p className="mb-1 text-muted">{edu.institution}</p>
                                        <small className="text-secondary">
                                            {edu.startYear} - {edu.endYear}
                                        </small>
                                        <p className="mt-2 fw-semibold text-success">
                                            {edu.percentage}% 📊
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="fw-semibold text-danger border-bottom pb-2">🌐 Social Links</h4>
                        <div className="d-flex gap-3 mt-3">
                            {friend.facebookId && (
                                <a
                                    href={friend.facebookId}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    🌍 Facebook
                                </a>
                            )}
                            {friend.instagramId && (
                                <a
                                    href={friend.instagramId}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-danger rounded-pill px-4"
                                >
                                    📸 Instagram
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}