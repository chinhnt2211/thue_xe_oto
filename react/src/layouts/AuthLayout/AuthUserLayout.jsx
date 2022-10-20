import { Footer } from '@/components/Footers';

function AuthUserLayout({ children }) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
}

export default AuthUserLayout;
