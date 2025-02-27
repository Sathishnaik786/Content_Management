import React, { useState, useRef, useEffect } from "react";
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

const categories = [
    "all", "entertainment", "education", "news", "health", "technology", "nature", "music", "games", "sports", "fashion", "food", "travel", "business", "science", "movies", "history", "politics", "fitness", "automobile"
];

function Articles() {
    const [category, setCategory] = useState("all");
    const [likes, setLikes] = useState({});
    const [selectedArticle, setSelectedArticle] = useState(null);
    const categoryRef = useRef(null);

    useEffect(() => {
        const handleWheelScroll = (event) => {
            if (categoryRef.current) {
                event.preventDefault(); // Prevents scrollbar from appearing
                categoryRef.current.scrollLeft += event.deltaY;
            }
        };
        const categoryElement = categoryRef.current;
        if (categoryElement) {
            categoryElement.addEventListener("wheel", handleWheelScroll);
        }
        return () => {
            if (categoryElement) {
                categoryElement.removeEventListener("wheel", handleWheelScroll);
            }
        };
    }, []);

    const handleLike = (index) => {
        setLikes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    };

    return (
        <div className="container-fluid mt-2">
            {!selectedArticle && (
                <div className="category-container d-flex overflow-auto" ref={categoryRef}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`btn btn-dark m-1 ${category === cat ? "bg-white text-dark" : ""}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            )}
            <div className="row mt-3">
                {selectedArticle ? (
                    <div className="col-12 text-center">
                        <button className="btn btn-light mb-3" onClick={() => setSelectedArticle(null)}>Back</button>
                        <div className="card mx-auto p-3 shadow-lg" style={{ maxWidth: "600px" }}>
                            <img src={selectedArticle.img} className="card-img-top" alt="Selected" />
                            <div className="card-body">
                                <h3 className="fw-bold">{selectedArticle.title}</h3>
                                <p className="text-muted">{selectedArticle.description}</p>
                                <span className="fw-bold" onClick={() => handleLike(selectedArticle.title)} style={{ cursor: "pointer" }}>❤ {likes[selectedArticle.title] || 0}</span>
                            </div>
                        </div>
                        <h5 className="mt-4">Related Articles</h5>
                        <div className="row justify-content-center mt-3">
                            {cardsData.filter(article => article.category === selectedArticle.category && article.title !== selectedArticle.title).map((article, index) => (
                                <div key={index} className="col-md-3 mb-4">
                                    <div className="card shadow-sm border-0 rounded-4" onClick={() => setSelectedArticle(article)} style={{ cursor: "pointer" }}>
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
                    cardsData.filter(card => category === "all" || card.category === category).map((card, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                            <div className="card shadow-sm border-0 rounded-4" onClick={() => setSelectedArticle(card)} style={{ cursor: "pointer" }}>
                                <img src={card.img} className="card-img-top rounded-3" alt="Card" />
                                <div className="card-body d-flex justify-content-between">
                                    <b className="card-title m-0 fw-semibold">{card.title}</b>
                                    <span className="fw-bold" onClick={(e) => { e.stopPropagation(); handleLike(card.title); }} style={{ cursor: "pointer" }}>❤ {likes[card.title] || 0}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Articles;