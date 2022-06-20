import { Route, Switch } from "react-router-dom"

import { HomeList as List } from "./list"

const Home = () => {
  return (
    <Switch>
      <Route component={List} />
    </Switch>
  )
}

export default Home
