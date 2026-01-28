import Player from "../../components/features/player/Player";

function Playlist() {
  return (
    <>
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>4</li>
          <li>4</li>
        </ul>
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            zIndex: "40",
            right: "20px",
          }}
        >
          <Player></Player>
        </div>
      </div>
    </>
  );
}

export default Playlist;
