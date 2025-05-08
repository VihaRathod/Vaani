import Gujrat from './images/Gujrat.png';

function Importance() {
  return (
    <div className="ImportanceContainer">
      <div className="ImageContainer">
        <img src={Gujrat} className="GujratImage" alt="Map of Gujarat" />
      </div>

      <div className="ImportanceContent">
        <h1 style={{ fontFamily:"Yeseva One" , marginBottom: 30 }}>Why It Matters</h1>

        <h5> Empowering Overlooked Communities</h5>
        <p>→ Giving deaf and mute individuals tools to express themselves and learn in their own language.</p>

        <h5>Bridging the Localization Gap</h5>
        <p>→ Focused on Indian Sign Language to reflect local culture and real-life communication.</p>

        <h5>Supporting Families, Educators, and Allies</h5>
        <p>→ Enabling better communication and deeper understanding among caregivers and communities.</p>

        <h5> Merging Modern Technology with Inclusive Education</h5>
        <p>→ Making sign language learning accessible through intuitive, tech-driven experiences.</p>
      </div>
    </div>
  );
}

export default Importance;
