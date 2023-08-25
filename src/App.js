import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import SpecialContext from './context/SpecialContext'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideosList: [], reactionList: []}

  changeTheMode = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  addToSavedVideos = object => {
    console.log(object)
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, object],
    }))
  }

  removeFromSavedVideos = object => {
    console.log(object)
    this.setState(prevState => ({
      savedVideosList: prevState.savedVideosList.filter(
        each => each.id !== object.id,
      ),
    }))
  }

  addReaction = (id, reactionType) => {
    const reaction = {id, reactionType}
    console.log(reaction)
    this.removeReaction(id)
    this.setState(prevState => ({
      reactionList: [...prevState.reactionList, reaction],
    }))
  }

  removeReaction = id => {
    this.setState(prevState => ({
      reactionList: prevState.reactionList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {isDark, savedVideosList, reactionList} = this.state
    return (
      <SpecialContext.Provider
        value={{
          isDark,
          savedVideosList,
          changeTheMode: this.changeTheMode,
          addToSavedVideos: this.addToSavedVideos,
          removeFromSavedVideos: this.removeFromSavedVideos,
          reactionList,
          addReaction: this.addReaction,
          removeReaction: this.removeReaction,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SpecialContext.Provider>
    )
  }
}

export default App
