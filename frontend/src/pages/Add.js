import AddPost from "./../components/AddPost";
import AddTag from "./../components/AddTag";

const Add = () => {
  const username = localStorage.getItem("username");
  if (!username) {return};

  return (
    <div>
      <AddPost />
      <AddTag />
    </div>
  );
};

export default Add;