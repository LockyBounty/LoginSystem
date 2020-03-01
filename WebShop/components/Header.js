import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Link href="/styled">
      <a style={linkStyle}>Styled Page</a>
    </Link>
    <Link href="/random">
      <a style={linkStyle}>Random Page</a>
    </Link>
  </div>
);

export default Header;