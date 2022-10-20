import { Header } from '@/components/Headers';
import { Footer } from '@/components/Footers';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
