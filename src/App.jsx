import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Auth from "./component/Auth";
import Blogs from "./component/Blogs";
import UserBlogs from "./component/UserBlogs";
import BlogDetail from "./component/BlogDetail";
import AddBlog from "./component/AddBlog";
import { useSelector } from "react-redux";

function App() {
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
   
  // console.log(isLoggedIn)

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/myblogs" element={<UserBlogs />} />
          <Route path="/myblogs/:id" element={<BlogDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
