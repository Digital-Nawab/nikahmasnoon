import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL, URLIMAGE } from "../api";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/api/gallery`, {
          headers: { Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon" },
        });
        console.log(response);
        setGallery(response.data.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Error fetching city data");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="flex bg-gray-100 justify-center px-5 py-14">
      <div className="container">
        <div className="text-center w-full">
          <h1 className="text-3xl">
            Our <span className="text-green-700">Success Stories</span>
          </h1>
          <div className="py-10">
            <div className="">
              <LightGallery
                speed={500}
                elementClassNames="grid grid-cols-2 gap-3 md:grid-cols-3"
                plugins={[lgThumbnail, lgZoom]}
              >
                {gallery.map((img, index) => (
                  <a
                    href={`https://nikahmasnoon.digitalnawab.com/${img.image}`}
                    key={index}
                    className="overflow-hidden"
                  >
                    <img
                      className="h-80 w-full object-cover object-top rounded-lg transform transition duration-500 hover:scale-110 hover:object-top"
                      src={`https://nikahmasnoon.digitalnawab.com/${img.image}`}
                      alt={`gallery-photo-${index}`}
                    />
                  </a>
                ))}
              </LightGallery>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Gallery;
