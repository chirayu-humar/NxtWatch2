import React from 'react'

const SpecialContext = React.createContext({
  isDark: false,
  savedVideosList: [],
  changeTheMode: () => {},
  addToSavedVideos: () => {},
  removeFromSavedVideos: () => {},
  reactionList: [],
  addReaction: () => {},
  removeReaction: () => {},
})

export default SpecialContext
