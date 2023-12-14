import './App.css'
import Layout from "./components/Layout.tsx";

function App() {


  return (
    <>
        <Layout>
        <div>
            <div className="w-5 h-5 bg-accent"></div>
            <div className="w-5 h-5 bg-body-bg"></div>
            <div className="w-5 h-5 bg-body-bg-hover"></div>
            <div className="w-5 h-5 bg-border"></div>
            <div className="w-5 h-5 bg-text-gray"></div>
            <div className="w-5 h-5 bg-text-light"></div>
            <div className="w-5 h-5 bg-transparent"></div>
            <h2 className="text-small">Hallo!</h2>
            <h2 className="text-medium">Hallo!</h2>
            <h2 className="text-large">Hallo!</h2>
            <h2 className="text-xlarge">Hallo!</h2>
        </div>
        </Layout>
    </>
  )
}

export default App
