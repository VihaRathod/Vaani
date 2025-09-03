import React from 'react'
import GirlLearning from '../images/GirlLearning.png';


function Goal(){
return<div className='GoalContainer'>
<div className='Goals'>
   <h1 style={{fontFamily:"Yeseva One"}}>Goals of Vaani </h1>     
   <h2 style={{fontFamily:"Yeseva One"}}>Our Mission</h2>
   <p style={{fontFamily:"Frank Ruhl Libre"}}>At Vaani, our mission is to make communication inclusive by providing a dedicated platform for learning Indian Sign Language (ISL)—with a special focus on regional accessibility for Gujarati speakers.</p>
   <p style={{fontFamily:"Frank Ruhl Libre"}} >We believe that everyone deserves the tools to express themselves, regardless of their ability to speak or hear. While most platforms overlook regional and cultural needs, Vaani bridges that gap by offering a modern, interactive space where learners of all kinds—deaf, mute, hearing, family, or educators—can come together to connect, learn, and grow.
</p>
<p style={{fontFamily:"Frank Ruhl Libre"}}>Through engaging lessons, visual dictionaries, and community support, we're giving hands a voice—and helping build a world where communication truly knows no barriers.</p>
</div>
<div class="GirlImageContainer">
    <img class="GirlImage" src={GirlLearning} />
</div>

</div>

   
}export default Goal;
