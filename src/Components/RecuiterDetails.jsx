import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import api from '../api/axios'


export default function RecruiterDetails() {
    const [recruiter, setRecruiter] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const cached = localStorage.getItem("recruiterData");

        if (cached) {
            setRecruiter(JSON.parse(cached));
            setLoading(false);
        } else {
            const fetchData = async () => {
                try {
                    const jwtToken = localStorage.getItem("token");
                    if (!jwtToken) {
                        console.error("No token found in localStorage");
                        return;
                    }

                    const response = await api.get("/recuiter", {
                        headers: { Authorization: `Bearer ${jwtToken}` },
                    });

                    const recruiter = response.data[0];
                    setRecruiter(recruiter);
                    localStorage.setItem("recruiterData", JSON.stringify(recruiter));

                } catch (error) {
                    console.error("Error fetching recruiter details:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, []);


    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (!recruiter) return <p className="text-center mt-5">No recruiter details available</p>;

    return (
        <>
            <Headers />
            <div className="cont" style={{ maxWidth: "100vw", backgroundColor: 'rgba(250, 249, 223, 1)' }}>
                <div className="container py-5" style={{ maxWidth: "1100px", backgroundColor: 'rgba(250, 249, 223, 1)' }}>

                    <div className="card shadow-lg border-0 rounded-4 mb-5 p-3">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-4 text-center p-4">
                                <img
                                    src="https://gmwqohructrttbxtggvq.supabase.co/storage/v1/object/public/Portfolio/profile%20pic.jpeg"
                                    alt={recruiter.name}
                                    className="img-fluid rounded-circle shadow"
                                    style={{
                                        width: "220px",
                                        height: "220px",
                                        objectFit: "cover",
                                        border: "5px solid #fff",
                                        transition: "transform 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                />
                            </div>

                            <div className="col-md-8 p-4">
                                <h2 className="fw-bold text-dark">{recruiter.name}</h2>
                                <p className="text-secondary">{recruiter.about}</p>
                                <div className="mt-3 d-flex flex-wrap gap-2">
                                    <a href={recruiter.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                        💼 LinkedIn
                                    </a>
                                    <a href={recruiter.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">
                                        🖥 GitHub
                                    </a>
                                    <a href={`mailto:${recruiter.mailId}`} className="btn btn-outline-success btn-sm">
                                        📧 Mail
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h4 className="fw-semibold text-primary border-bottom pb-2 mb-3">💼 Experience</h4>
                        {recruiter.experience
                            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
                            .map((exp, index) => (
                                <div
                                    key={index}
                                    className="card border-0 shadow-sm mb-4 p-3 rounded-4"
                                    style={{
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
                                    <h5 className="fw-bold text-dark mb-1">
                                        {exp.designation} @ {exp.companyName}
                                    </h5>
                                    <small className="text-muted">
                                        {exp.place} | {new Date(exp.fromDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                                    </small>
                                    <ul className="mt-3 mb-0">
                                        {exp.description.map((point, i) => (
                                            <li key={i} className="text-secondary">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>

                    <div className="card shadow-lg border-0 rounded-4 mb-5">
                        <div className="card-body p-4">
                            <h4 className="fw-semibold text-warning border-bottom pb-2 mb-3">⚡ Skills</h4>
                            <div className="row g-3">
                                {recruiter.skillSet.map((skill, index) => (
                                    <React.Fragment key={index}>
                                        {Object.entries(skill).map(([category, skillsArray]) => (
                                            <div key={category} className="col-md-6">
                                                <h6 className="fw-bold text-secondary">
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </h6>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {skillsArray.map((s, i) => (
                                                        <span
                                                            key={i}
                                                            className="badge rounded-pill bg-dark text-white p-2"
                                                            style={{
                                                                transition: "all 0.3s ease",
                                                                cursor: "pointer",
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = "#ffc107";
                                                                e.currentTarget.style.color = "#000";
                                                                e.currentTarget.style.transform = "scale(1.1)";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = "#343a40";
                                                                e.currentTarget.style.color = "#fff";
                                                                e.currentTarget.style.transform = "scale(1)";
                                                            }}
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h4 className="fw-semibold text-success border-bottom pb-2 mb-3">🎓 Education</h4>
                        <div className="d-flex overflow-auto pt-3 pb-2" style={{ gap: "1rem" }}>
                            {recruiter.education
                                .sort((a, b) => b.endYear - a.endYear)
                                .map((edu, index) => (
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
                                            <p className="mt-2 fw-semibold text-success">{edu.percentage}% 📊</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="mb-5">
                        <h4 className="fw-semibold text-info border-bottom pb-2 mb-3">🚀 Projects</h4>
                        <div className="d-flex flex-wrap gap-3">
                            {recruiter.projects.map((proj, index) => (
                                <div
                                    key={index}
                                    className="card border-0 shadow-sm p-3 rounded-4"
                                    style={{
                                        minWidth: "200px",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-4px)";
                                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
                                    }}
                                >
                                    <h6 className="fw-bold">{proj.projectNames}</h6>
                                    <a href={proj.projectUrls} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-primary">
                                        🔗 {proj.projectUrls}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
