import React, { useEffect, useState } from "react";
import "../../css/style.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner.foodItems || []);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err.response || err.message);
      });
  }, [id]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="fp-profile-container">
      {/* Profile Header */}
      <div className="fp-profile-header">
        <div className="fp-profile-avatar-wrapper">
          <div className="fp-profile-avatar"></div>
        </div>
        <div className="fp-profile-info">
          <h2 className="fp-profile-business">{profile?.name}</h2>
          <p className="fp-profile-address">{profile?.address}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="fp-profile-stats">
        <div>
          <div className="fp-profile-stat-value">{profile?.totalMeals}</div>
          <div className="fp-profile-stat-label">Meals</div>
        </div>
        <div>
          <div className="fp-profile-stat-value">{profile?.customerServed}</div>
          <div className="fp-profile-stat-label">Customers</div>
        </div>
        <div>
          <div className="fp-profile-stat-value">{profile?.reviews}</div>
          <div className="fp-profile-stat-label">Reviews</div>
        </div>
      </div>

      <hr className="fp-profile-divider" />

      {/* Grid of Reels */}
      <div className="fp-profile-grid">
        {videos.length === 0 ? (
          <p className="fp-no-videos">No videos uploaded yet.</p>
        ) : (
          videos.map((video) => (
            <div
              key={video._id}
              className="fp-profile-grid-item"
              onClick={() => setSelectedVideo(video)}
            >
              <video src={video.video} muted />
              <div className="fp-play-overlay">▶</div>
            </div>
          ))
        )}
      </div>

     {/* Modal Player */}
{selectedVideo && (
  <div className="fp-video-modal" onClick={() => setSelectedVideo(null)}>
    <div
      className="fp-video-wrapper"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      {/* ✖ Close Button */}
      <span className="fp-close-btn" onClick={() => setSelectedVideo(null)}>
        ✖
      </span>

      <video src={selectedVideo.video} controls autoPlay />

      {/* ✅ Description + Button */}
      <div className="fp-video-overlay">
        <p className="fp-video-desc">{selectedVideo.description}</p>
        <button className="fp-video-btn">Visit Store</button>
      </div>
    </div>
  </div>
)}
      {/* End Modal Player */}
      
    </div>
  );
};

export default Profile;
