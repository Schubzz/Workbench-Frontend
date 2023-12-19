import {ComponentType, ReactNode} from "react";
import Layout from '../components/Layout';

interface WithLayoutProps {
    children?: ReactNode;
}

const withLayout = <P extends WithLayoutProps>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => (
        <Layout>
            <WrappedComponent {...props} />
        </Layout>
    );
};

export default withLayout;
