import Nav from '../components/Navbar/NavLimited';

const Home = () => {
    return (
        <div>
            <Nav />
            <div style={{ marginTop: '50px', textAlign: 'center', padding: '50px' }}>
                <h1>Home Page</h1>
                <p>This page is the homepage.</p>
            </div>
        </div>
    );
};

export default Home;
