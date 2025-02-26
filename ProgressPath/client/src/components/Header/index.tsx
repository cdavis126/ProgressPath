import Typewriter from 'typewriter-effect';

const Header = () => {
  return (
    <header 
      style={{
        marginTop: "120px",
        textAlign: "center",
        padding: "40px 20px",
      }}
      >
      <div 
        style={{
        fontSize: "3rem",
        fontWeight: "700", 
        color: "black",
        lineHeight: "1.3",
        }}
      >
        <Typewriter
          options={{
            strings: ['Welcome, USERNAME! 👋', 'Keep moving forward! 🚀', 'Let’s reach the next milestone! ✨', 'In it to WIN it!'],
            autoStart: true,
            loop: true,
            delay: 120,
          }}
        />
      </div>
    </header>
  );
};

export default Header;