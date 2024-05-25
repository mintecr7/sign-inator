import Messages from "./Messages";
import Webcam from "./Webcam";

const App: React.FC = () => {
  return (
    <div className="m-5">
      <p className="bold text-center text-4xl mb-4">Sign-inator</p>
      <div className="flex justify-center">
        <Webcam />
        <Messages />
      </div>
    </div>
  );
};

export default App;
