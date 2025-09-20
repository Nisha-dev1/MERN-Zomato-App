import React, { useEffect, useRef, useState } from "react";
import "../../css/style.css";
import axios from "axios";
import { Link } from "react-router-dom";

const initialVideos = [
  {
    src: "https://www.pexels.com/download/video/8879540/",
    foodPartner: "1",
    description: "Visit our amazing burger store for delicious treats and offers.",
  },
  {
    src: "https://www.pexels.com/download/video/16132396/",
    foodPartner: "2",
    description: "Fresh pizza, hot from the oven. Order now and enjoy!",
  }, 
];

const truncate = (text, maxLength = 80) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

const Home = () => {
  const [videoList, setVideoList] = useState(initialVideos);
  const containerRef = useRef(null);

  // Auto-play/pause videos when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            video.play().catch((e) => console.log("Video play error:", e));
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.75] }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      const vids = currentContainer.querySelectorAll("video");
      vids.forEach((v) => observer.observe(v));
    }

    return () => {
      if (currentContainer) {
        const vids = currentContainer.querySelectorAll("video");
        vids.forEach((v) => observer.unobserve(v));
      }
      observer.disconnect();
    };
  }, [videoList]);

  // Fetch videos from API
  useEffect(() => {
    axios
      .get("/api/food")
      .then((response) => {
        console.log("API response:", response.data); // debug

        // ✅ your backend returns { message, food: [...] }
        if (Array.isArray(response.data?.food)) {
          const mappedVideos = response.data.food.map((item) => ({
            src: item.video, // ✅ use `video`
            foodPartner: item.foodPartnerId, // ✅ use `foodPartnerId`
            description: item.description || item.name || "Delicious food!",
          }));
          setVideoList(mappedVideos);
        } else {
          setVideoList(initialVideos);
        }
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
        setVideoList(initialVideos);
      });
  }, []);

  return (
    <div className="reel-container" ref={containerRef}>
      {(Array.isArray(videoList) ? videoList : []).map((video, idx) => (
        <div className="reel-video" key={idx}>
          <video
            src={video.src}
            className="reel-media"
            controls
            autoPlay
            loop
            muted
          />
          <div className="reel-overlay">
            <div className="reel-desc">{truncate(video.description)}</div>
            <Link className="reel-btn" to={"/food-partner/" + video.foodPartner}>
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
