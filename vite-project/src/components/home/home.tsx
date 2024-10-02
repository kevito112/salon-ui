import './home.css';
import Navbar from "../navbar/navbar.tsx";
import Footer from "../footer/footer.tsx";
import heroImage from '../../assets/images/hero.png';

const Home = () => {
    return (
        <div>
            <div className="home container">
                <Navbar />
                <section className="hero container">
                    <img src={heroImage} className="hero-image" />
                    <h1>Enhance Your Beauty.</h1>
                    <p>Get ready to shine with a little expert TLC!</p>
                    <button className="book-now-button">Book Now</button>
                </section>
                <section className="about container section">
                <h1>About Section</h1>
                    <p>This is the about section of the application.</p>
                </section>
                <section className="treatments container section">
                    <h1>Treatments Section</h1>
                    <p>This is the treatments section of the application.</p>
                </section>
                <section className="contact container section">
                    <h1>Contact Section</h1>
                    <p>This is the contact section of the application.</p>
                </section>
                <div style={{height: '20vh'}}></div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;