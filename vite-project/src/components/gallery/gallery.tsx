import { useEffect, useState } from 'react';
import './gallery.css';
import Navbar from "../navbar/navbar.tsx";
import Footer from "../footer/footer.tsx";
import sanityClient from "../../client";

const Gallery = () => {

    const [allImagesData, setAllImages] = useState<{ asset: { _id: string; url: string } }[] | null>(null);
    const [columns, setColumns] = useState<{ asset: { _id: string; url: string } }[][]>([[], [], []]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      sanityClient
        .fetch(
          `*[_type == "event"]{
             images[]{
               asset->{
                 _id,
                 url
               }
             }
           }`
        )
     .then((data: { images: { asset: { _id: string; url: string } }[] }[]) => {
            if (data.length > 0) {
              const images = data[0].images.reverse();
              setAllImages(images);

              const col1: { asset: { _id: string; url: string } }[] = [];
              const col2: { asset: { _id: string; url: string } }[] = [];
              const col3: { asset: { _id: string; url: string } }[] = [];

              images.forEach((image, index) => {
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

    const openModal = (index: number) => {
        if (allImagesData) {
            console.log(index);
            setSelectedImage(allImagesData[index].asset.url);
            setCurrentIndex(index);
        }
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const showPrevImage = () => {
        if (allImagesData) {
            const newIndex = (currentIndex - 1 + allImagesData.length) % allImagesData.length;
            console.log("we are now at the previous index: " + newIndex)
            setSelectedImage(allImagesData[newIndex].asset.url);
            setCurrentIndex(newIndex);
        }
    };
    const showNextImage = () => {
        if (allImagesData) {
            const newIndex = (currentIndex + 1) % allImagesData.length;
            console.log("we are now at the next index: " + newIndex)
            setSelectedImage(allImagesData[newIndex].asset.url);
            setCurrentIndex(newIndex);
        }
    };
    return (
        <div className="whole">
            <Navbar />
            <div className="gallery-container">
                <h2 className="title"> GALLERY </h2>
                <div className="photo-gallery">
                    <div className="column">
                          {col1.map((image, index) => (
                            <div key={image.asset._id} className="photo">
                              <img src={image.asset.url} alt="" />
                            </div>
                          ))}
                    </div>
                    <div className="column">
                          {col2.map((image, index) => (
                            <div key={image.asset._id} className="photo">
                              <img src={image.asset.url} alt="" />
                            </div>
                          ))}
                    </div>
                    <div className="column">
                          {col3.map((image, index) => (
                            <div key={image.asset._id} className="photo">
                              <img src={image.asset.url} alt="" />
                            </div>
                          ))}
                    </div>
                </div>
            </div>
            {selectedImage && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <span className="prev" onClick={showPrevImage}>&#10094;</span>
                    <img className="modal-content" src={selectedImage} alt="" />
                    <span className="next" onClick={showNextImage}>&#10095;</span>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Gallery;