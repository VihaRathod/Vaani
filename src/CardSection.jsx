import React from 'react';
import Card from './Card';
  // Replace with actual SVG paths
import { IoIosPeople as Icon1} from "react-icons/io";
import { PiTextAUnderlineFill as Icon2 } from "react-icons/pi";
import { GiSpellBook as Icon3} from "react-icons/gi";
import { MdForum as Icon4 } from "react-icons/md";



const CardSection = () => {
  const cardData = [
    {
      icon: <Icon1 size={100} color="#e9e3d6"  />,
      title: 'Interactive, Step-by-Step ISL Lessons',
      description: 'Learn Indian Sign Language through structured lessons tailored to Indian speakers.'
    },
    {
      icon: <Icon2 size={80} color="#e9e3d6" />,
      title: 'Visual Dictionary of Indian Signs',
      description: 'Browse signs with videos and real-world examples to improve recall and understanding.'
    },
    {
      icon: <Icon3 size={90} color="#e9e3d6" />,
      title: 'Practice Modules with Scenarios',
      description: 'Engage in interactive practice modules focused on everyday communication.'
    },
    {
      icon: <Icon4 size={80} color="#e9e3d6" />,
      title: 'Community Discussions and Support',
      description: 'Connect with learners and educators to share experiences and ask questions.'
    }
   
  ];

  return (<div style={{backgroundColor:"#e9e3d6", marginBottom:70}}>
    
    <h1 className='HeadingOfFeatures'>What You'll Find Here</h1>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {cardData.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
    </div>
  );
};

export default CardSection;   