import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const cardsData = [
    {
        category: "entertainment",
        img: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Movie Night", description: "Experience the magic of cinema with a perfect movie night! Grab some popcorn, cozy up with your favorite people, and enjoy a film that takes you on an unforgettable journey. Whether it’s a comedy, thriller, or classic drama, movie nights are the perfect way to relax and escape reality.."
    },
    { category: "education", img: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Study Tips", description: "Boost your learning efficiency with expert study tips! From time management strategies to effective note-taking techniques, mastering the art of studying can help you retain information better and perform well in exams. Stay organized, take regular breaks, and create a distraction-free environment for maximum focus.." },
    { category: "news", img: "https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Breaking News", description: "Stay updated with the latest breaking news from around the world. Whether it's politics, business, technology, or global events, get real-time information to stay informed and ahead of the curve. Never miss out on crucial updates that impact your daily life." },
    {
        category: "health",
        img: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Healthy Living", description: "Achieve a balanced and fulfilling lifestyle with healthy living practices. Focus on nutritious eating, regular exercise, and mental well-being to enhance your quality of life. Small daily habits like drinking more water, sleeping well, and practicing mindfulness can make a huge difference in your overall health."
    },
    {
        category: "entertainment",
        img: "https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Music Fest", description: "Experience the magic of cinema with a perfect movie night! Grab some popcorn, cozy up with your favorite people, and enjoy a film that takes you on an unforgettable journey. Whether it’s a comedy, thriller, or classic drama, movie nights are the perfect way to relax and escape reality.."
    },
    {
        category: "health",
        img: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Nutrition Guide", description: "Achieve a balanced and fulfilling lifestyle with healthy living practices. Focus on nutritious eating, regular exercise, and mental well-being to enhance your quality of life. Small daily habits like drinking more water, sleeping well, and practicing mindfulness can make a huge difference in your overall health."
    },
    {
        category: "education",
        img: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Online Courses", description: "Boost your learning efficiency with expert study tips! From time management strategies to effective note-taking techniques, mastering the art of studying can help you retain information better and perform well in exams. Stay organized, take regular breaks, and create a distraction-free environment for maximum focus."
    },
    {
        category: "news",
        img: "https://images.pexels.com/photos/3957616/pexels-photo-3957616.jpeg?auto=compress&cs=tinysrgb&w=600", title: "World News", description: "Stay updated with the latest breaking news from around the world. Whether it's politics, business, technology, or global events, get real-time information to stay informed and ahead of the curve. Never miss out on crucial updates that impact your daily life."
    },
    {
        category: "entertainment",
        img: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Movie Night", description: "Experience the magic of cinema with a perfect movie night! Grab some popcorn, cozy up with your favorite people, and enjoy a film that takes you on an unforgettable journey. Whether it’s a comedy, thriller, or classic drama, movie nights are the perfect way to relax and escape reality.."
    },
    {
        category: "education",
        img: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Study Tips", description: "Boost your learning efficiency with expert study tips! From time management strategies to effective note-taking techniques, mastering the art of studying can help you retain information better and perform well in exams. Stay organized, take regular breaks, and create a distraction-free environment for maximum focus.."
    },
    {
        category: "news",
        img: "https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Breaking News", description: "Stay updated with the latest breaking news from around the world. Whether it's politics, business, technology, or global events, get real-time information to stay informed and ahead of the curve. Never miss out on crucial updates that impact your daily life."
    },
    {
        category: "health",
        img: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Healthy Living", description: "Achieve a balanced and fulfilling lifestyle with healthy living practices. Focus on nutritious eating, regular exercise, and mental well-being to enhance your quality of life. Small daily habits like drinking more water, sleeping well, and practicing mindfulness can make a huge difference in your overall health."
    },
    {
        category: "entertainment",
        img: "https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Music Fest", description: "Experience the magic of cinema with a perfect movie night! Grab some popcorn, cozy up with your favorite people, and enjoy a film that takes you on an unforgettable journey. Whether it’s a comedy, thriller, or classic drama, movie nights are the perfect way to relax and escape reality.."
    },
    {
        category: "health",
        img: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Nutrition Guide", description: "Achieve a balanced and fulfilling lifestyle with healthy living practices. Focus on nutritious eating, regular exercise, and mental well-being to enhance your quality of life. Small daily habits like drinking more water, sleeping well, and practicing mindfulness can make a huge difference in your overall health."
    },
    {
        category: "education",
        img: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Online Courses", description: "Boost your learning efficiency with expert study tips! From time management strategies to effective note-taking techniques, mastering the art of studying can help you retain information better and perform well in exams. Stay organized, take regular breaks, and create a distraction-free environment for maximum focus."
    },
    {
        category: "news",
        img: "https://images.pexels.com/photos/3957616/pexels-photo-3957616.jpeg?auto=compress&cs=tinysrgb&w=600", title: "World News", description: "Stay updated with the latest breaking news from around the world. Whether it's politics, business, technology, or global events, get real-time information to stay informed and ahead of the curve. Never miss out on crucial updates that impact your daily life."
    }
];

function Articles() {
    const [category, setCategory] = useState("all");
    const [likes, setLikes] = useState({});
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleLike = (index) => {
        setLikes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    };

    const handleCardClick = (article) => {
        setSelectedArticle(article);
    };

    const handleBack = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="container mt-4">
            {/* Category Filter Buttons */}
            {!selectedArticle && (
                <div className="d-flex justify-content-center mb-3">
                    {['all', 'entertainment', 'health', 'education', 'news'].map((cat) => (
                        <button
                            key={cat}
                            className={`category - btn mx-2 ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            )
            }

            {/* Article Details View */}
            {
                selectedArticle ? (
                    <div className="text-center">
                        {/* Back Button */}
                        <button className="btn btn-light mb-3 float-end" onClick={handleBack}>Back</button>

                        {/* Centered Article Card */}
                        <div className="d-flex w-100 justify-content-center" >
                            <div className="card shadow-lg border-0 rounded-4 text-center" style={{ width: "70%" }}>
                                <img src={selectedArticle.img} className="card-img-top rounded-3" alt="Selected" />
                                <div className="card-body">
                                    <h3 className="fw-bold">{selectedArticle.title}</h3>
                                    <p className="text-muted">{selectedArticle.description}</p>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold" style={{ cursor: "pointer" }} onClick={() => handleLike(selectedArticle.title)}>❤ {likes[selectedArticle.title] || 0}</span>
                                        <span className="text-muted fw-semibold">👁 2.5k</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Articles Below */}
                        <h5 className="mt-5">Related Articles</h5>
                        <div className="row justify-content-center mt-3">
                            {cardsData
                                .filter(article => article.category === selectedArticle.category && article.title !== selectedArticle.title)
                                .map((article, index) => (
                                    <div key={index} className="col-md-3 mb-4">
                                        <div className="card shadow-sm border-0 rounded-4" onClick={() => handleCardClick(article)} style={{ cursor: "pointer" }}>
                                            <img src={article.img} className="card-img-top rounded-3" alt="Related" />
                                            <div className="card-body">
                                                <h6 className="card-title">{article.title}</h6>
                                                <p className="text-muted small">{article.description.slice(0, 50)}...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : (
                    /* Article List View */
                    <div className="row mt-5">
                        {cardsData.filter(card => category === "all" || card.category === category).map((card, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card custom-card animate-card shadow-sm border-0 rounded-4" onClick={() => handleCardClick(card)} style={{ cursor: "pointer" }}>
                                    <img src={card.img} className="card-img-top rounded-3" alt="Card" />
                                    <div className="card-body d-flex justify-content-between">
                                        <b className="card-title m-0 fw-semibold">{card.title}</b>
                                        <div className="ps-3">
                                            <span className="fw-bold" style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); handleLike(index); }}>❤ {likes[index] || 0}</span>
                                            <span className="text-muted fw-semibold">👁 2.5k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
}

export default Articles;