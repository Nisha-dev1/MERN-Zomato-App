import React, { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for redirect

const CreateFood = () => {
  const [preview, setPreview] = useState(null);
  const [name, setFoodName] = useState("");
  const [description, setFoodDesc] = useState("");
  const [video, setVideoFile] = useState(null);

  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name); // ✅ match backend
      formData.append("description", description); // ✅ match backend
      if (video) {
        formData.append("video", video); // ✅ field name must match backend
      }

      const res = await axios.post("http://localhost:3000/api/food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // if using cookies for auth
      });

      console.log("✅ Stored in DB:", res.data);

      if (res.data.message === "success") {
  navigate("/"); 
}
    } catch (err) {
      console.error(
        "❌ Error creating food:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="create-food-container">
      <div className="create-food-card">
        <h2 className="create-food-title">Create Food Post</h2>

        <form className="create-food-form" onSubmit={handleSubmit}>
          {/* Food Video Upload */}
          <div className="form-group">
            <label htmlFor="foodVideo" className="form-label">
              Upload Food Video
            </label>

            <div className="upload-box">
              <input
                type="file"
                id="foodVideo"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden-input"
              />
              <label htmlFor="foodVideo" className="upload-label">
                <Upload size={42} />
                <p>Click to upload video</p>
              </label>
            </div>

            {preview && (
              <video src={preview} controls className="food-preview"></video>
            )}
          </div>

          {/* Food Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              value={name}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Enter food name (e.g. Pasta, Pizza)"
              className="form-input"
              required
            />
          </div>

          {/* Food Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="foodDesc"
              value={description}
              onChange={(e) => setFoodDesc(e.target.value)}
              placeholder="Write something about this food..."
              rows="4"
              className="form-textarea"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary">
            Post Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
