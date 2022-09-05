import { Footer } from '../components/Footer';

function AuthUserLayout({ children }) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
}

export default AuthUserLayout;
