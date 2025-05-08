import App from "./App";
import MainPage from "./images/MainPage.png"
function Intro(){
    return<div className="MainPage">
        <h1 className="MainHeading">Learn Indian Sign Language</h1>
        <p className="MainParagraph">An interactive, user-friendly platform designed to help deaf and mute individuals, educators, and families master Indian Sign Language (GSL)</p>
    <img src={MainPage}  style={{ height:"700px",width:"1280px"}}/>
    <button className="MainButton">Start Learning</button>

    </div>
}
export default Intro;
