import { createStore } from 'redux'
import reducer from './../reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore = () => createStore(reducer)
export default configureStore