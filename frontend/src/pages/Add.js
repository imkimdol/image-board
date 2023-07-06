import AddPost from "./../components/AddPost";
import AddTag from "./../components/AddTag";

const Add = () => {
  const username = localStorage.getItem("username");

  return (
    <div>
      {username && <AddPost />}
      <AddTag />
    </div>
  );
};

export default Add;