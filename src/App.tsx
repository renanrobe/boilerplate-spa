import { Suspense } from "react"
import { HashRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Provider } from "react-redux"

import Routes from "./routes"
import store from "./store"

import "./scss/styles.scss"

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback="loading">
        <Router>
          <ToastContainer />
          <Routes />
        </Router>
      </Suspense>
    </Provider>
  )
}

export default App
