import logo from '../images/logo.svg';
import App from './App';

export default function Header() {
  return (
    <header className="header">
    <img className="header__logo" src={logo} alt="Логотип"/>
  </header>
  )
}
