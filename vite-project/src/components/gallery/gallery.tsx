import { useEffect, useState } from 'react';
import './gallery.css';
import Navbar from "../navbar/navbar.tsx";
import Footer from "../footer/footer.tsx";
import sanityClient from "../../client.js";

interface Image {
  asset: {
    _id: string;
    url: string;
  };
}

interface Event {
  images: Image[];
}

const Gallery = () => {
  const [columns, setColumns] = useState<[Image[], Image[], Image[]]>([[], [], []]);

  useEffect(() => {
    sanityClient
      .fetch<Event[]>(
        `*[_type == "event"]{
           images[]{
             asset->{
               _id,
               url
             }
           }
         }`
      )
      .then((data) => {
        if (data.length > 0) {
          const images = data[0].images.reverse();

          const col1: Image[] = [];
          const col2: Image[] = [];
          const col3: Image[] = [];

          images.forEach((image: Image, index: number) => {
            if (index % 3 === 0) {
              col1.push(image);
            } else if (index % 3 === 1) {
              col2.push(image);
            } else {
              col3.push(image);
            }
          });
          setColumns([col1, col2, col3]);
        }
      })
      .catch(console.error);
  }, []);

  const [col1, col2, col3] = columns;

  return (
    <div className="whole">
      <Navbar />
      <div className="gallery-container">
        <h2 className="title"> GALLERY </h2>
        <div className="photo-gallery">
          <div className="column">
            {col1.map((image) => (
              <div key={image.asset._id} className="photo">
                <img src={image.asset.url} alt="" />
              </div>
            ))}
          </div>
          <div className="column">
            {col2.map((image) => (
              <div key={image.asset._id} className="photo">
                <img src={image.asset.url} alt="" />
              </div>
            ))}
          </div>
          <div className="column">
            {col3.map((image) => (
              <div key={image.asset._id} className="photo">
                <img src={image.asset.url} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;