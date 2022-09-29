import React, { StrictMode } from 'react'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

const windowParentHeader =
  window.parent.document.querySelectorAll('.modal-header')
if (windowParentHeader) {
  windowParentHeader.forEach((item) => {
    if (
      item?.querySelector('h4').textContent === 'Предпросмотр файлов' ||
      item?.querySelector('h4').textContent === 'Редактор файлов'
    ) {
      item.style.cssText = `
        position: absolute;
        z-index: 9999;
        width: 95%;
        border-bottom: none;
        background-color: #fff;
      `
      item.querySelector('button').style.display = 'none'
    }
  })
}

// frame styles
const windowParentFrame = window.parent.document.querySelectorAll('.modal-body')
if (windowParentFrame) {
  windowParentFrame.forEach((item) => {
    if (
      item?.previousElementSibling?.lastElementChild?.innerText ===
      'Предпросмотр файлов'
    ) {
      item.setAttribute(
        'style',
        'height: 100vh; padding: 0px; background-color: rgba(0, 0, 0, 0.9)'
      )
    } else if (
      item?.previousElementSibling?.lastElementChild?.innerText ===
      'Редактор файлов'
    ) {
      item.setAttribute(
        'style',
        'height: 100%; padding: 0px; background-color: rgba(0, 0, 0, 0.9)'
      )
    }
  })
}

const windowParent = window.parent.document.querySelector(
  'iframe[src="/reactphoto/build/"]'
)
if (windowParent) {
  windowParent.style.height = '100vh'
  windowParent.style.zIndex = '10'
  windowParent.setAttribute('height', '100vh')
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  //   <StrictMode>
  <App />
  //   </StrictMode>
)

reportWebVitals()
