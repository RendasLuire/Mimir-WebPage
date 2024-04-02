import Header from "./Header";
import Outlet from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      {<Header />}
      <section className="layout_content">
        <Outlet />
      </section>
    </>
  );
};

export default PublicLayout;
