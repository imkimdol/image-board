import CreatePost from "../components/CreatePost";
import CreateTag from "../components/CreateTag";

const Add = () => {
  const username = localStorage.getItem("username");

  return (
    <div>
      {username && <CreatePost />}
      <CreateTag />
    </div>
  );
};

export default Add;