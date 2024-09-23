import './home.css';
import Navbar from "../navbar/navbar.tsx";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home">
                <h1>Welcome to the Home Component</h1>
                <p>This is the home page of the application.</p>
                <div style={{height: '300vh'}}></div>
            </div>
        </div>
    );
};

export default Home;