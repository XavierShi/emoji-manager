import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './samples/node-api'
import 'styles/index.css'
import '@arco-design/web-react/dist/css/arco.css'
import './style/index.css'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
