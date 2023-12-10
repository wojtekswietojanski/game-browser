import "../styling/Navbar/navbar.css";
const Navbar = ({ changePage }) => {
  return (
    <header className="header">
      <h1>Games Data</h1>
      <nav>
        <button onClick={() => changePage(0)}>HOME</button>
        <button onClick={() => changePage(1)}>QUIZ</button>
      </nav>
    </header>
  );
};

export default Navbar;
