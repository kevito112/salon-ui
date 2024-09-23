import './services.css';
import Navbar from "../navbar/navbar.tsx";

const Home = () => {
    return (
        <div className="services">
            <Navbar />
            <h1>Welcome to the Services Component</h1>
            <p>This is the Services of the application.</p>
        </div>
    );
};

export default Home;