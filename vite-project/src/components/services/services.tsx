import { useEffect, useState } from 'react';
import './services.css';
import Navbar from "../navbar/navbar.tsx";
import Footer from "../footer/footer.tsx";
import Dropdown from "../dropdown/dropdown.tsx";
import cancellationImage from '../../assets/images/cancellation2.png';

export interface CardData {
    title: string;
    description: string;
    price: string;
    hourPrice: string;
    subsection? : string;
}

interface SectionData {
    imgSrc: string;
    cards: CardData[];
}

const Services = () => {
    const [sections, setSections] = useState<{ [key: string]: SectionData }>({});

    useEffect(() => {
        fetch('src/service-data.json')
            .then(response => response.json())
            .then(data => setSections(data))
            .catch(error => console.error('Error fetching service data:', error));
    }, []);

    console.log(sections);
    return (
        <div className="full-page">
            <Navbar/>
            <div className="container2">
                <h2 className="services">services</h2>
                {Object.keys(sections).map((sectionKey) => (
                    <Dropdown
                        key={sectionKey}
                        generalServiceName={sectionKey}
                        imgSrc={sections[sectionKey].imgSrc}
                        cards={sections[sectionKey].cards}
                    />
                ))}
                <div className="cancellation-container">
                    <img src={cancellationImage} className="cancellation-img" alt="Service Image" />
                    <div className="cancellation-text">
                        <h2 className="cancellation-title">CANCELLATION POLICY</h2>
                        <p className="cancellation-description">
                            It is required to provide a <strong>24-Hour notice of cancellation.</strong>
                        </p>
                        <p className="cancellation-big-description">
                            Because a time slot is reserved specifically for you, please make any schedule changes by 5PM the day before service to avoid incurring a <strong>$50 late cancellation fee.</strong>
                        </p>
                    </div>
                </div>
                <div className="filler-space" ></div>
            </div>
            <Footer />
        </div>
    );
};

export default Services;