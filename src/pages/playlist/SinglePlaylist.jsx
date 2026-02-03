import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import "./playlist.scss";
import PlaylistRecommend from "./PlaylistRecommend";

function SinglePlaylist({ lists, songs, selectPlaylist }) {
  const { id } = useParams();
  const [targetList, setTargetList] = useState(null);

  const songMap = useMemo(() => {
    const map = new Map();
    songs.forEach((s) => map.set(s.id, s));
    return map;
  }, [songs]);

  useEffect(() => {
    if (!id || !lists.length) return;

    const listId = Number(id);
    const list = lists.find((l) => l.id === listId);
    if (!list) return;

    setTargetList(list);
  }, [id, lists]);

  if (!targetList) {
    return <p className="text-center">載入中...</p>;
  }

  return (
    <>
      <section>
        <div className="container py-11">
          <div className="mb-4 text-center">
            <Button text={targetList.listName} imgUrl="/Union.png" />
          </div>
          <ul>
            {targetList.songsID.map((songId, index) => {
              const song = songMap.get(songId);
              return (
                <li key={songId} onClick={() => selectPlaylist(targetList.id, index)}>
                  {song?.fileName}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <PlaylistRecommend />
    </>
  );
}

export default SinglePlaylist;
