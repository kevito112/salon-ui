import './gallery.css';
import Navbar from "../navbar/navbar.tsx";
import Footer from "../footer/footer.tsx";

const Gallery = () => {
    return (
        <div className="whole">
            <Navbar />
            <div className="gallery-container">
                <h2 className="title"> GALLERY </h2>
                <div className="photo-gallery">
                    <div className="column">
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=3873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                    </div>
                    <div className="column">
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?q=80&w=3776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                    </div>
                    <div className="column">
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1616105950717-8102cc4afbd7?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=3802&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                        <div className="photo">
                            <img src="https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt = ""></img>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Gallery;