import Posts from "./components/Posts";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

import { Routes, Route } from "react-router-dom";
import Toprated from "./components/Toprated";
import Upcoming from "./components/Upcoming";

function App() {
  return (
    <>
      <NavBar />
      <main className="container pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="posts" element={<Posts />} />
          <Route path="toprated" element={<Toprated />} />
          <Route path="upcoming" element={<Upcoming />} />
          {/* <Route path="newPost" element={<NewPostForm />} />
          <Route path="posts/:id" element={<EditPostForm />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
