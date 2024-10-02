import './services.css';
import Navbar from "../navbar/navbar.tsx";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className="services">
                <h1>Welcome to the Services Component</h1>
                <p>This is the Services of the application.</p>
            </div>
        </div>
    );
};

export default Home;