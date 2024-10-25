import './home.css';
import Navbar from "../navbar/navbar.tsx";
import Footer from "../footer/footer.tsx";
import heroImage from '../../assets/images/homehero.png';
import Button from '../../components/button/button';
import ownerImg from '../../assets/images/process.png';
import topleft from '../../assets/images/topleft-collage.png';
import topright from '../../assets/images/topright-collage.png';
import bottomleft from '../../assets/images/bottomleft-collage.png';
import bottomright from '../../assets/images/bottomright-collage.png';
import aestheticsImg from '../../assets/images/aesthetics.png';
import relaxationImg from '../../assets/images/relaxation.png';
import individualityImg from '../../assets/images/individuality.png';

import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-full">
                <section className="hero container">
                    <div className="hero-image-wrapper">
                        <img src={heroImage} className="hero-image" />
                    </div>
                    <div className="hero-content">
                       <h1 className="hero-title">enhance your beauty.</h1>
                       <p className="hero-description">Get ready to shine with a little expert TLC!</p>
                        <Button
                            text="Book Now"
                            className="book-now-button-home"
                        />
                    </div>
                </section>
                <section className="about container section">
                    <div className="about-text-container">
                        <h2 className="about-title">get to know me</h2>
                        <h3 className="about-subheader">Your Expert In Personalized Skincare</h3>
                        <p>I’m Yeny, a certified esthetician with a passion for helping people feel their absolute best. As the proud owner and primary provider at KeyBeauty, I specialize in skincare, lash extensions, and waxing, offering personalized beauty treatments tailored to your individual needs. I’m committed to using top-quality products and staying fully up to date with the latest beauty techniques, ensuring you get the best results possible. My goal is to create a welcoming, relaxing environment where you can unwind and leave feeling confident, refreshed, and beautiful. At KeyBeauty, I focus on making every beauty experience truly exceptional. </p>
                    </div>
                    <img src={ownerImg} className="owner-img" alt="Owner" />
                </section>
                <section className="treatments container section">
                    <div className="image-collage">
                        <img src={topleft} className="topleft" />
                        <img src={topright} className="topright" />
                        <img src={bottomleft} className="bottomleft" />
                        <img src={bottomright} className="bottomright" />
                    </div>
                    <div className="treatments-text-container">
                         <h2>popular treatments</h2>
                            <ul>
                                <li><strong>Eyelash Extensions</strong>: Semi-permanent lashes applied to enhance length, thickness, and curl of eyelashes.</li>
                                <li><strong>Classic Facial</strong>: A cleansing and hydrating treatment that rejuvenates and nourishes the skin.</li>
                                <li><strong>Eyebrow Waxing</strong>: Shaping and removing excess eyebrow hair using hot or cold wax.</li>
                                <li><strong>Lymphatic Drainage Massage</strong>: A gentle massage promoting lymph flow to reduce swelling and improve circulation.</li>
                            </ul>
                            <Button
                                text="View More"
                                className="view-more-button"
                                url="/services"
                            />
                    </div>
                </section>
                <section className="contact container section">
                    <h2>reap the benefits</h2>
                    <p>Experience lasting benefits that enhance, refresh, and reveal
                       your natural beauty.</p>
                    <div className="benefit-cards">
                        <div className="benefit-card aesthetics">
                            <img src={aestheticsImg} alt="Aesthetics" className="aesthetics-img benefit-imgs" />
                            <h3>aesthetics</h3>
                            <p>Our treatments enhance your natural beauty, improving the look of your skin, lashes, and nails. You’ll leave with a more polished, radiant appearance that boosts your confidence. Step into everyday looking effortlessly fabulous.</p>
                        </div>
                        <div className="benefit-card relaxation">
                            <img src={relaxationImg} alt="Relaxation" className="relaxation-img benefit-imgs" />
                            <h3>relaxation</h3>
                            <p>Indulge in treatments designed to relieve stress and promote relaxation. Feel rejuvenated and refreshed, both physically and mentally. experience tranquility that lingers even long after your visit. </p>
                        </div>
                        <div className="benefit-card individuality">
                            <img src={individualityImg} alt="Individuality" className="individuality-img benefit-imgs" />
                            <h3>individuality</h3>
                            <p>Each service is personalized to meet your unique beauty goals. Whether it's a custom facial or perfectly shaped brows, we tailor every treatment to suit you. Get results that reflect your individual style and needs.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Home;