    import { Link } from "react-router-dom";

    const NavBar = () => {
    return (
        <>
        <div className="navBarContainer">
            <div>
            <h2>IronFlow</h2>
            </div>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>

            <Link to="/login">Login</Link>
            <Link to="/labs">Labs</Link>
            <Link to="/labs/create">Create a Lab</Link>

            <Link to="/1/projectOne">Project 1 QA</Link>
            <Link to="/2/projectTwo">Project 2 QA</Link>
            <Link to="/3/projectThree">Project 3 QA</Link>
            </nav>
        </div>
        </>
    );
    };

    export default NavBar;
