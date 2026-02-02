import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { URL, URLIMAGE } from "../api";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

function Galler() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileGallery, setprofileGallery] = useState({});
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const token = sessionStorage.getItem("token");
  const fetchprofileGallery = async () => {
    try {
      const response = await axios.get(`${URL}/api/my-gallery`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.data);
      setprofileGallery(response?.data?.data || {});
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Error loading profile data");
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchprofileGallery();
    }
  }, [token]);

  const handleMultiUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newPreviews = validFiles.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve({ file, preview: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((previewResults) => {
      setFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...previewResults]);
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveGalleryImage = async (imageId) => {
    console.log(imageId);
    const data = {
      imageId: imageId,
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://admin.nikahmasnoon.com/api/delete-user-gallery",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          toast.success("Image removed successfully");
          fetchprofileGallery();
        }
      })
      .catch((error) => {
        console.log(error);
        console.error("Error removing image:", error);
        toast.error("Failed to remove image");
      });
  };

  console.log(profileGallery);

  const handleUpdateGallery = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append(`gallery_image[]`, file));
    formData.append("token", token);

    try {
      const response = await axios.post(
        `${URL}/api/add-user-gallery`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Gallery updated successfully");
        setFiles([]);
        setPreviews([]);
        const updatedGallery = await axios.get(`${URL}/api/my-gallery`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setprofileGallery(updatedGallery?.data?.data || {});
      } else {
        toast.error(response.data.message || "Failed to update gallery");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Error updating gallery");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <form className="space-y-4" onSubmit={handleUpdateGallery}>
        <div className="grid grid-cols-10 gap-4 p-4">
          <div className="col-span-12 border bg-gradient-to-tl to-light-green-200 from-green-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">
              Gallery Images Upload
            </h3>
            <div className="mb-4">
              <label className="block mb-2">
                <span className="sr-only">Choose multiple images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultiUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </label>
            </div>
            <motion.button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={files.length === 0}
            >
              Upload Gallery Images
            </motion.button>
          </div>
        </div>
      </form>

      <div className="col-span-12 border p-4 bg-gradient-to-tr to-light-green-200 from-green-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Gallery Images</h3>
        <div className="grid grid-cols-6 gap-4">
          {previews.length > 0 ? (
            previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "fallback-image-url";
                    toast.error(
                      `Failed to load preview for image ${index + 1}`
                    );
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))
          ) : profileGallery?.length > 0 ? (
            profileGallery.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={`https://admin.nikahmasnoon.com/${image?.image_path}`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                  // onError={(e) => { e.target.src = 'fallback-image-url'; toast.error(`Failed to load gallery image ${index + 1}`); }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(image?.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-6 text-center text-gray-500">
              No images found in the gallery.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Galler;
