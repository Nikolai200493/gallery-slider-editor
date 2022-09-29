import { useState, useEffect } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { Editor } from './components/editor'
import { SaveAsBtn } from './components/saveToBtn'
import { saveAs } from 'file-saver'
import { getUrls } from './utils/utils'
import { getOriginalUrls } from './utils/utils'
import { getNames } from './utils/utils'
import { funcIsImageFormat } from './utils/utils'
import { base64ToBlob } from './utils/utils'
import { funcIsImageFormatByName } from './utils/utils'
import { getAndRemoveFromStorage } from './utils/utils'
import { getDegreeElement } from './utils/utils'

// for local test
// localStorage.setItem(
//   'photo-urls',
//   '[{"id":48217,"name":"ЗЭПБ сосуды УПВ - 28 шт.pdf","urlPrev":"https://drasler.ru/wp-content/uploads/2019/05/%D0%9C%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B8%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D1%81%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BA%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%D1%88%D0%BE%D0%BC005.jpg","urlDl":"https://vjoy.cc/wp-content/uploads/2019/09/unnamed.jpg"},{"id":408713,"name":"blob727260673.jpg","urlPrev":"https://www.zastavki.com/pictures/2560x1600/2011/Space_Big_planet_031405_.jpg","urlDl":"https://www.zastavki.com/pictures/2560x1600/2011/Space_Big_planet_031405_.jpg"},{"id":408714,"name":"blob286459562.jpg","urlPrev":"https://vjoy.cc/wp-content/uploads/2019/12/3dr-19.jpg","urlDl":"https://vjoy.cc/wp-content/uploads/2019/12/3dr-19.jpg"},{"id":48217,"name":"ЗЭПБ сосуды УПВ - 28 шт.pdf","urlPrev":"https://drasler.ru/wp-content/uploads/2019/05/%D0%9C%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B8%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D1%81%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BA%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%D1%88%D0%BE%D0%BC005.jpg","urlDl":"https://vjoy.cc/wp-content/uploads/2019/09/unnamed.jpg"},{"id":48217,"name":"ЗЭПБ сосуды УПВ - 28 шт.pdf","urlPrev":"https://drasler.ru/wp-content/uploads/2019/05/%D0%9C%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B8%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D1%81%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BA%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%D1%88%D0%BE%D0%BC005.jpg","urlDl":"https://vjoy.cc/wp-content/uploads/2019/09/unnamed.jpg"},{"id":409368,"name":"2.jpg","urlPrev":"/index.php/FileController/GetPreView/409368/preview.JPG","urlDl":"/index.php/FileController/DownloadFile/409368"},{"id":409369,"name":"test.jpeg","urlPrev":"/index.php/FileController/GetPreView/409369/preview.JPG","urlDl":"/index.php/FileController/DownloadFile/409369"},{"id":48217,"name":"ЗЭПБ сосуды УПВ - 28 шт.pdf","urlPrev":"https://drasler.ru/wp-content/uploads/2019/05/%D0%9C%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B8%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D1%81%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BA%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%D1%88%D0%BE%D0%BC005.jpg","urlDl":"https://vjoy.cc/wp-content/uploads/2019/09/unnamed.jpg"},{"id":48217,"name":"ЗЭПБ сосуды УПВ - 28 шт.pdf","urlPrev":"https://drasler.ru/wp-content/uploads/2019/05/%D0%9C%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B8%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D1%81%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BA%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%D1%88%D0%BE%D0%BC005.jpg","urlDl":"https://vjoy.cc/wp-content/uploads/2019/09/unnamed.jpg"},{"id":48217,"name":"ЗЭПБ сосуды УПВ - 28 шт.pdf","urlPrev":"https://drasler.ru/wp-content/uploads/2019/05/%D0%9C%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B8%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D1%81%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BA%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%D1%88%D0%BE%D0%BC005.jpg","urlDl":"https://vjoy.cc/wp-content/uploads/2019/09/unnamed.jpg"}]'
// )

const listRefreshButton = window.parent.document.querySelector(
  '.btn.btn-default.btn-outline.btn-sm.m-t-btn-reload'
)
const refreshButton = window.parent.document.querySelector(
  '.jsPanel-btn.btn_upd_form'
)
if (listRefreshButton) {
  console.log('refresh button', listRefreshButton)
} else if (refreshButton) {
  console.log('save button', refreshButton)
}

export function isUndoStackClear() {
  const historyList = document.querySelector('.history-list')
  if (historyList) {
    const historyItems = historyList.querySelectorAll('.history-item')
    let result = true
    if (historyItems.length > 1) {
      result = false
    } else {
      result = true
    }
    return result
  } else {
    return true
  }
}

const initialState = JSON.parse(getAndRemoveFromStorage('photo-urls'))
const initialFirstStringData = getAndRemoveFromStorage('firstString')
const initialSecondStringData = getAndRemoveFromStorage('secondString')
const initialThirdStringData = getAndRemoveFromStorage('thirdString')
const initialFourthStringData = getAndRemoveFromStorage('fourthString')

function App() {
  const [imagesData, setImagesData] = useState(initialState)
  const [firstStringData] = useState(initialFirstStringData)
  const [secondStringData] = useState(initialSecondStringData)
  const [thirdStringData] = useState(initialThirdStringData)
  const [fourthStringData] = useState(initialFourthStringData)

  const [allImages, setAllImages] = useState([])
  const [currentImage, setCurrentImage] = useState(0)
  const [currentViewImage, setCurrentViewImage] = useState(allImages[0])
  const [isGalleryOpen, setIsGalleryOpen] = useState(true)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [newImagePath, setNewImagePath] = useState('')
  const [isImageFormat, setIsImageFormat] = useState(true)
  const [rotateImage, setRotateImage] = useState(0)
  const [zoomImage, setZoomImage] = useState(0)
  const [renderFromEditor, setRenderFromEditor] = useState(0)

  const [changesEdit, setChangesEdit] = useState('') // saved by save as; saved by save
  const [changesViewer, setChangesViewer] = useState('') // uploaded; saved by save as; saved by save

  const handleImageAdd = (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      if (funcIsImageFormat(event.target.files[0])) {
        setIsImageFormat(true)
        const fileReader = new FileReader()
        fileReader.readAsDataURL(event.target.files[0])
        fileReader.onload = function () {
          const newfilename = event.target.files[0].name
          setNewFileName(newfilename)
          const base64Image = fileReader.result

          if (funcIsImageFormat(event.target.files[0])) {
            setIsImageFormat(true)
          }

          setAllImages((prevState) => [...prevState, fileReader.result])

          const currentImageName = getNames(imagesData)[currentImage]
          if (funcIsImageFormatByName(currentImageName)) {
            setIsImageFormat(true)
          }

          const fileBin = base64ToBlob(base64Image)
          let status = function (response) {
            if (response.status !== 200) {
              return Promise.reject(new Error(response.statusText))
            }
            return Promise.resolve(response)
          }
          let json = function (response) {
            return response.json()
          }
          let formData = new FormData()
          formData.append('TabId', firstStringData)
          formData.append(secondStringData, thirdStringData)
          formData.append(fourthStringData, fileBin)
          formData.append('NewFileName', newfilename)

          // XMLHttpRequest
          var request = new XMLHttpRequest()
          request.open('POST', '/index.php/FileController/UploadFileForm')
          request.onload = function (e) {
            const responseXhr = JSON.parse(request.responseText)[0]
            const updatedResponseXhr = { ...responseXhr }
            updatedResponseXhr.urlDl = `/index.php/FileController/DownloadFile/${responseXhr.ID}`
            updatedResponseXhr.urlPrev = `/index.php/FileController/GetPreView/${responseXhr.ID}/preview.JPG`
            updatedResponseXhr.name = responseXhr.Name
            updatedResponseXhr.id = responseXhr.ID

            setImagesData((prevState) => [...prevState, updatedResponseXhr])
            setIsImageFormat(true)
            setChangesViewer('uploaded')
          }
          request.send(formData)

          setTimeout(() => {
            setNewImagePath(allImages[allImages.length])
            setCurrentImage(allImages.length)
            setIsImageFormat(true)
          })
        }
        setCurrentImage(allImages.length - 1)
        setTimeout(() => {
          setNewImagePath(allImages[allImages.length])
          setCurrentImage(allImages.length)
          setIsImageFormat(true)
        })
      } else {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(event.target.files[0])
        fileReader.onload = function () {
          const newfilename = event.target.files[0].name
          setNewFileName(newfilename)
          const base64Image = fileReader.result
          setAllImages((prevState) => [...prevState, fileReader.result])
          const currentImageName = getNames(imagesData)[currentImage]

          const fileBin = base64ToBlob(base64Image)
          let status = function (response) {
            if (response.status !== 200) {
              return Promise.reject(new Error(response.statusText))
            }
            return Promise.resolve(response)
          }
          let json = function (response) {
            return response.json()
          }
          let formData = new FormData()
          formData.append('TabId', firstStringData)
          formData.append(secondStringData, thirdStringData)
          formData.append(fourthStringData, fileBin)
          formData.append('NewFileName', newfilename)

          // XMLHttpRequest
          var request = new XMLHttpRequest()
          request.open('POST', '/index.php/FileController/UploadFileForm')
          request.onload = function (e) {
            const responseXhr = JSON.parse(request.responseText)[0]
            const updatedResponseXhr = { ...responseXhr }
            updatedResponseXhr.urlDl = `/index.php/FileController/DownloadFile/${responseXhr.ID}/preview.JPG`
            updatedResponseXhr.urlPrev = `/index.php/FileController/GetPreView/${responseXhr.ID}/preview.JPG`
            updatedResponseXhr.name = responseXhr.Name
            updatedResponseXhr.id = responseXhr.ID

            setImagesData((prevState) => [...prevState, updatedResponseXhr])
            setChangesViewer('uploaded')
          }
          request.send(formData)
        }
        setCurrentImage(allImages.length - 1)
      }
    }
  }

  useEffect(() => {
    const currentImageName = getNames(imagesData)[currentImage]
    if (funcIsImageFormatByName(currentImageName)) {
      setIsImageFormat(true)
    } else {
      setIsImageFormat(false)
    }
  }, [currentImage])

  useEffect(() => {
    let images = []
    const fetchData = async () => {
      images = [...getOriginalUrls(imagesData)]
      setAllImages(images)
    }
    fetchData()
  }, [imagesData])

  const handleImages = (url, newUrl, name) => {
    setAllImages((prevImages) => {
      if (url) {
        return imagesData
      }
      if (newUrl) {
        return imagesData
      }
    })
  }

  const handleEditorOpen = () => {
    setIsEditorOpen(true)
    setIsViewerOpen(false)
    setIsGalleryOpen(false)
    setChangesEdit('')

    const titleWindowParentFrame =
      window.parent.document.querySelectorAll('.modal-header')
    if (titleWindowParentFrame) {
      titleWindowParentFrame.forEach((item) => {
        if (item?.querySelector('h4').textContent === 'Предпросмотр файлов') {
          item.querySelector('h4').textContent = 'Редактор файлов'
        }
      })
    }
  }

  const openImageViewer = (index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }

  document.onkeydown = function (event) {
    if (['ArrowRight', 'l'].includes(event.key)) {
      console.log('right', event)
      event.preventDefault()
      return false
    }
  }

  const changeImageRight = () => {
    setCurrentImage((prevState) => prevState + 1)
    if (currentImage >= allImages.length - 1) {
      setCurrentImage(0)
    }
  }
  const changeImageLeft = () => {
    if (currentImage > 0) {
      setCurrentImage((prevState) => prevState - 1)
    }
    if (currentImage <= 0) {
      setCurrentImage(allImages.length - 1)
    }
  }

  const closeImageViewer = () => {
    setIsViewerOpen(false)
    setIsGalleryOpen(true)
  }

  const closeEditor = () => {
    let isAgree = null
    const isClearUndoStack = isUndoStackClear()
    setRotateImage(0)
    setRenderFromEditor((prevState) => prevState + 1)

    if (changesViewer !== 'uploaded' && isClearUndoStack) {
      setIsEditorOpen(false)
      setIsGalleryOpen(true)
      setIsViewerOpen(true)
      setChangesEdit('')
    } else if (isClearUndoStack) {
      setIsEditorOpen(false)
      setIsGalleryOpen(true)
      setIsViewerOpen(true)
      setChangesEdit('')
    } else if (changesEdit) {
      setIsEditorOpen(false)
      setIsGalleryOpen(true)
      setIsViewerOpen(true)
      setChangesEdit('')
    } else {
      const askAgree = window.confirm(
        'Вы уверены, что хотите закрыть редактор?\nНесохраненные изменения будут утеряны.'
      )
      isAgree = askAgree
      if (isAgree) {
        setIsEditorOpen(false)
        setIsGalleryOpen(true)
        setIsViewerOpen(true)
        setChangesEdit('')
      } else {
        return
      }
    }

    const titleWindowParentFrame =
      window.parent.document.querySelectorAll('.modal-header')
    if (titleWindowParentFrame) {
      titleWindowParentFrame.forEach((item) => {
        if (
          item?.querySelector('h4').textContent === 'Редактор файлов' &&
          isAgree
        ) {
          item.querySelector('h4').textContent = 'Предпросмотр файлов'
        }
      })
    }
  }

  // close parent frame (X)
  const closeParentWindow = function () {
    if (changesViewer === 'uploaded' && changesEdit && !isUndoStackClear()) {
      // window.parent.location.reload()
      if (refreshButton) {
        refreshButton.dispatchEvent(new Event('click', {bubbles: true}))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      } else {
        listRefreshButton.dispatchEvent(new Event('click'))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      }

      setIsGalleryOpen(false)
      setIsViewerOpen(false)
      setIsEditorOpen(false)
    } else if (
      changesViewer === 'uploaded' &&
      !changesEdit &&
      !isUndoStackClear()
    ) {
      const isConfirm = window.confirm('Вы хотите сохранить изменения?')
      if (isConfirm) {
        const upperCanvas = document.querySelector('.lower-canvas')
        const dataUrl = upperCanvas.toDataURL()
        const fileBin = base64ToBlob(dataUrl)

        let status = function (response) {
          if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText))
          }
          return Promise.resolve(response)
        }
        let json = function (response) {
          return response.json()
        }
        let formData = new FormData()

        const pd = [...imagesData]
        var pdi
        if (currentImage >= 0 && currentImage < pd.length) {
          pdi = pd[currentImage]
        }
        formData.append('TabId', firstStringData)
        formData.append(secondStringData, thirdStringData)
        formData.append(fourthStringData, fileBin)
        if (newFileName) {
          formData.append('NewFileName', newFileName)
          formData.append('OldFileId', pdi.ID)
        } else {
          if (pdi) {
            formData.append('NewFileName', pdi.name)
            formData.append('OldFileId', pdi.id)
          }
        }
        if (pdi.id) {
          formData.append('OldFileId', pdi.id)
        } else {
          formData.append('OldFileId', pdi.ID)
        }

        // XMLHttpRequest
        const photoData = [...imagesData]
        let currentId = null
        if (photoData[currentImage].ID) {
          currentId = photoData[currentImage].ID
        } else {
          currentId = photoData[currentImage].id
        }
        let request = new XMLHttpRequest()
        request.open('POST', '/index.php/FileController/UploadFileForm', false)
        try {
          request.send(formData)
          const responseXhr = JSON.parse(request.responseText)[0]
          const updatedResponseXhr = { ...responseXhr }
          updatedResponseXhr.urlDl = `/index.php/FileController/DownloadFile/${currentId}`
          updatedResponseXhr.urlPrev = `/index.php/FileController/GetPreView/${currentId}/preview.JPG`
          if (responseXhr.Name) {
            updatedResponseXhr.name = responseXhr.Name
          }
        } catch (error) {
          alert(error)
        }
        // window.parent.location.reload()
        if (refreshButton) {
          refreshButton.dispatchEvent(new Event('click', {bubbles: true}))
          const bootbox = window.parent.document.querySelector('.bootbox.modal')
          const backdrop =
            window.parent.document.querySelector('.modal-backdrop')

          if (bootbox && backdrop) {
            bootbox.remove()
            backdrop.remove()
          }
        } else {
          listRefreshButton.dispatchEvent(new Event('click'))
          const bootbox = window.parent.document.querySelector('.bootbox.modal')
          const backdrop =
            window.parent.document.querySelector('.modal-backdrop')

          if (bootbox && backdrop) {
            bootbox.remove()
            backdrop.remove()
          }
        }
        setIsGalleryOpen(false)
        setIsViewerOpen(false)
        setIsEditorOpen(false)
      } else {
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      }
    } else if (
      changesViewer === 'uploaded' &&
      changesEdit &&
      isUndoStackClear()
    ) {
      // window.parent.location.reload()
      if (refreshButton) {
        refreshButton.dispatchEvent(new Event('click', {bubbles: true}))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      } else {
        listRefreshButton.dispatchEvent(new Event('click'))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      }
      setIsGalleryOpen(false)
      setIsViewerOpen(false)
      setIsEditorOpen(false)
    } else if (
      changesViewer !== 'uploaded' &&
      changesEdit &&
      !isUndoStackClear()
    ) {
      // window.parent.location.reload()
      if (refreshButton) {
        refreshButton.dispatchEvent(new Event('click', {bubbles: true}))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      } else {
        listRefreshButton.dispatchEvent(new Event('click'))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      }
      setIsGalleryOpen(false)
      setIsViewerOpen(false)
      setIsEditorOpen(false)
    } else if (
      changesViewer !== 'uploaded' &&
      !changesEdit &&
      !isUndoStackClear()
    ) {
      const isConfirm = window.confirm('Вы хотите сохранить изменения?')
      if (isConfirm) {
        const upperCanvas = document.querySelector('.lower-canvas')
        const dataUrl = upperCanvas.toDataURL()
        const fileBin = base64ToBlob(dataUrl)

        let status = function (response) {
          if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText))
          }
          return Promise.resolve(response)
        }
        let json = function (response) {
          return response.json()
        }
        let formData = new FormData()
        const pd = [...imagesData]
        var pdi
        if (currentImage >= 0 && currentImage < pd.length) {
          pdi = pd[currentImage]
        }
        formData.append('TabId', firstStringData)
        formData.append(secondStringData, thirdStringData)
        formData.append(fourthStringData, fileBin)
        if (newFileName) {
          formData.append('NewFileName', newFileName)
          formData.append('OldFileId', pdi.ID)
        } else {
          if (pdi) {
            formData.append('NewFileName', pdi.name)
            formData.append('OldFileId', pdi.id)
          }
        }
        if (pdi.id) {
          formData.append('OldFileId', pdi.id)
        } else {
          formData.append('OldFileId', pdi.ID)
        }

        // XMLHttpRequest
        const photoData = [...imagesData]
        let currentId = null
        if (photoData[currentImage].ID) {
          currentId = photoData[currentImage].ID
        } else {
          currentId = photoData[currentImage].id
        }
        let request = new XMLHttpRequest()
        request.open('POST', '/index.php/FileController/UploadFileForm', false)
        try {
          request.send(formData)
          const responseXhr = JSON.parse(request.responseText)[0]
          const updatedResponseXhr = { ...responseXhr }
          updatedResponseXhr.urlDl = `/index.php/FileController/DownloadFile/${currentId}`
          updatedResponseXhr.urlPrev = `/index.php/FileController/GetPreView/${currentId}/preview.JPG`
          if (responseXhr.Name) {
            updatedResponseXhr.name = responseXhr.Name
          }
        } catch (error) {
          alert(error)
        }
        // window.parent.location.reload()
        if (refreshButton) {
          refreshButton.dispatchEvent(new Event('click', {bubbles: true}))
          const bootbox = window.parent.document.querySelector('.bootbox.modal')
          const backdrop =
            window.parent.document.querySelector('.modal-backdrop')

          if (bootbox && backdrop) {
            bootbox.remove()
            backdrop.remove()
          }
        } else {
          listRefreshButton.dispatchEvent(new Event('click'))
          const bootbox = window.parent.document.querySelector('.bootbox.modal')
          const backdrop =
            window.parent.document.querySelector('.modal-backdrop')

          if (bootbox && backdrop) {
            bootbox.remove()
            backdrop.remove()
          }
        }
        setIsGalleryOpen(false)
        setIsViewerOpen(false)
        setIsEditorOpen(false)
      } else {
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      }
    } else if (
      changesViewer !== 'uploaded' &&
      changesEdit &&
      isUndoStackClear()
    ) {
      return
    } else if (
      (changesViewer === 'saved by save as' ||
        changesViewer === 'saved by save') &&
      !changesEdit
    ) {
      // window.parent.location.reload()
      if (refreshButton) {
        refreshButton.dispatchEvent(new Event('click', {bubbles: true}))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      } else {
        listRefreshButton.dispatchEvent(new Event('click'))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      }
      setIsGalleryOpen(false)
      setIsViewerOpen(false)
      setIsEditorOpen(false)
    } else if (changesViewer === 'uploaded') {
      // window.parent.location.reload()
      if (refreshButton) {
        refreshButton.dispatchEvent(new Event('click', {bubbles: true}))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      } else {
        listRefreshButton.dispatchEvent(new Event('click'))
        const bootbox = window.parent.document.querySelector('.bootbox.modal')
        const backdrop = window.parent.document.querySelector('.modal-backdrop')

        if (bootbox && backdrop) {
          bootbox.remove()
          backdrop.remove()
        }
      }
      setIsGalleryOpen(false)
      setIsViewerOpen(false)
      setIsEditorOpen(false)
    } else {
      const bootbox = window.parent.document.querySelector('.bootbox.modal')
      const backdrop = window.parent.document.querySelector('.modal-backdrop')

      if (bootbox && backdrop) {
        bootbox.remove()
        backdrop.remove()
      }
    }
  }

  useEffect(() => {
    setIsViewerOpen(false)
    setTimeout(() => {
      setIsViewerOpen(true)
    })
  }, [currentImage])

  const handleRotateLeft = () => {
    setRotateImage((prevState) => prevState - 90)
  }
  const handleRotateRight = () => {
    setRotateImage((prevState) => prevState + 90)
  }

  useEffect(() => {
    const imageViewerBlock = document.querySelector(
      '.react-simple-image-viewer__slide'
    )
    if (imageViewerBlock) {
      const rotateImg = imageViewerBlock.querySelector('img')
      rotateImg.style.transform = `rotate(${rotateImage}deg)`
      rotateImg.style.position = 'fixed'
    }
  }, [rotateImage])

  const handleZoomIn = () => {
    const zoomContainer = document.querySelector(
      '.react-simple-image-viewer__slide'
    )
    if (zoomContainer) {
      setZoomImage((prevState) => prevState + 1)
      const zoomImg = zoomContainer.querySelector('img')
      let imgHeight = 0
      let imgWidth = 0

      const rotationValue = getDegreeElement(zoomImg)
      const isEven = (number) => {
        return (number / 90) % 2 === 0
      }

      if (isEven(rotationValue)) {
        imgHeight = zoomImg.getBoundingClientRect().height
        imgWidth = zoomImg.getBoundingClientRect().width
      } else {
        imgWidth = zoomImg.getBoundingClientRect().height
        imgHeight = zoomImg.getBoundingClientRect().width
      }

      if (imgWidth >= imgHeight) {
        zoomContainer.style.cssText = `
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            `
        zoomImg.style.cssText = `
                position: fixed;
                min-height: 100px;
                min-width: 100px;
                max-height: 1000%;
                max-width: 1000%;
                width: ${imgWidth + 100}px;
                cursor: grab;
                transform: rotate(${rotationValue}deg);
              `
      } else {
        zoomContainer.style.cssText = `
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            `
        zoomImg.style.cssText = `
                position: fixed;
                min-height: 100px;
                min-width: 100px;
                max-height: 1000%;
                max-width: 1000%;
                height: ${imgHeight + 100}px;
                cursor: grab;
                transform: rotate(${rotationValue}deg);
              `
      }
    }
  }
  const handleZoomOut = () => {
    const zoomContainer = document.querySelector(
      '.react-simple-image-viewer__slide'
    )
    if (zoomContainer) {
      setZoomImage((prevState) => prevState + 1)
      const zoomImg = zoomContainer.querySelector('img')
      let imgHeight = 0
      let imgWidth = 0

      const rotationValue = getDegreeElement(zoomImg)
      const isEven = (number) => {
        return (number / 90) % 2 === 0
      }

      if (isEven(rotationValue)) {
        imgHeight = zoomImg.getBoundingClientRect().height
        imgWidth = zoomImg.getBoundingClientRect().width
      } else {
        imgWidth = zoomImg.getBoundingClientRect().height
        imgHeight = zoomImg.getBoundingClientRect().width
      }

      if (imgWidth >= imgHeight) {
        zoomContainer.style.cssText = `
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            `
        zoomImg.style.cssText = `
                position: fixed;
                min-height: 100px;
                min-width: 100px;
                max-height: 1000%;
                max-width: 1000%;
                width: ${imgWidth - 100}px;
                cursor: grab;
                transform: rotate(${rotationValue}deg);
              `
      } else {
        zoomContainer.style.cssText = `
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            `
        zoomImg.style.cssText = `
                position: fixed;
                min-height: 100px;
                min-width: 100px;
                max-height: 1000%;
                max-width: 1000%;
                height: ${imgHeight - 100}px;
                cursor: grab;
                transform: rotate(${rotationValue}deg);
              `
      }
    }
  }

  useEffect(() => {
    setRotateImage(0)
  }, [currentImage])

  // zoom
  const zoomContainer = document.querySelector(
    '.react-simple-image-viewer__slide'
  )
  if (zoomContainer) {
    const zoomImg = zoomContainer.querySelector('img')
    zoomContainer.style.position = 'relative'
    zoomImg.style.position = 'absolute'
    zoomImg.style.cursor = 'grab'
  }

  useEffect(() => {
    const zoomContainer = document.querySelector(
      '.react-simple-image-viewer__slide'
    )
    if (zoomContainer) {
      const zoomImg = zoomContainer.querySelector('img')
      zoomImg.style.transform = `rotate(${rotateImage}deg)`
    }

    setTimeout(() => {
      const zoomContainer = document.querySelector(
        '.react-simple-image-viewer__slide'
      )
      if (zoomContainer) {
        const zoomImg = zoomContainer.querySelector('img')
        zoomImg.addEventListener('wheel', (e) => {
          e.preventDefault()
          e.stopImmediatePropagation()
          const eventValue = e.deltaY < 0 ? -100 : 100
          setZoomImage((prevState) => prevState + 1)

          let imgHeight = 0
          let imgWidth = 0

          const rotationValue = getDegreeElement(zoomImg)
          const isEven = (number) => {
            return (number / 90) % 2 === 0
          }

          if (isEven(rotationValue)) {
            imgHeight = zoomImg.getBoundingClientRect().height
            imgWidth = zoomImg.getBoundingClientRect().width
          } else {
            imgWidth = zoomImg.getBoundingClientRect().height
            imgHeight = zoomImg.getBoundingClientRect().width
          }

          if (imgWidth >= imgHeight) {
            zoomContainer.style.cssText = `
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            `
            zoomImg.style.cssText = `
                position: fixed;
                min-height: 100px;
                min-width: 100px;
                max-height: 1000%;
                max-width: 1000%;
                width: ${imgWidth - eventValue}px;
                cursor: grab;
                transform: rotate(${rotationValue}deg);
              `
          } else {
            zoomContainer.style.cssText = `
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            `
            zoomImg.style.cssText = `
                position: fixed;
                min-height: 100px;
                min-width: 100px;
                max-height: 1000%;
                max-width: 1000%;
                height: ${imgHeight - eventValue}px;
                cursor: grab;
                transform: rotate(${rotationValue}deg);
              `
          }
        })
      }
    }, 100)
  }, [currentImage, rotateImage, renderFromEditor])

  //-----------------------------------------------------------------------------------------

  useEffect(() => {
    const zoomContainer = document.querySelector(
      '.react-simple-image-viewer__slide'
    )
    if (zoomContainer) {
      const zoomImg = zoomContainer.querySelector('img')

      zoomImg.onmousedown = function (e) {
        const coords = getCoords(zoomImg)
        const shiftX = e.pageX - coords.left
        const shiftY = e.pageY - coords.top
        zoomContainer.style.zIndex = '1'
        zoomImg.style.position = 'fixed'
        zoomImg.style.zIndex = '0'
        moveAt(e)

        function moveAt(e) {
          zoomImg.style.left = e.pageX - shiftX + 'px'
          zoomImg.style.top = e.pageY - shiftY + 'px'
        }

        document.onmousemove = function (e) {
          moveAt(e)
        }

        document.onmouseup = function () {
          document.onmousemove = null
          zoomImg.onmouseup = null
        }
      }
      zoomImg.ondragstart = function () {
        return false
      }
      function getCoords(elem) {
        const box = elem.getBoundingClientRect()
        return {
          top: box.top + window.pageYOffset,
          left: box.left + window.pageXOffset
        }
      }
    }
  })
  // zoom end

  return (
    <div
      className={'app d-flex ' + (!isEditorOpen ? 'flex-row' : 'flex-column')}
    >
      <>
        <div style={{ zIndex: 9999 }}>
          <div>
            <button className="close-parent-button" onClick={closeParentWindow}>
              ×
            </button>
          </div>
          {isGalleryOpen && imagesData && (
            <div className="add-photo-block h-100">
              <div className="">
                {firstStringData &&
                  secondStringData &&
                  thirdStringData &&
                  fourthStringData && (
                    <div className="add-photo-button">
                      <label
                        className="btn btn-secondary btn-sm add-photo-button"
                        htmlFor="add-photo-input"
                      >
                        +Добавить фотографию
                      </label>
                      <input
                        className="btn"
                        type="file"
                        accept=".jpg,.jpeg,.png,.tiff,.bmp,.gif,.svg"
                        onChange={handleImageAdd}
                        id="add-photo-input"
                        style={{ display: 'none' }}
                      />
                    </div>
                  )}
              </div>
              <div className="gallery-line d-flex flex-column h-100">
                {imagesData.map((src, index) => (
                  <div key={index} className="gallery-img-block">
                    <img
                      src={src.urlPrev}
                      onClick={() => openImageViewer(index)}
                      width="100"
                      key={index}
                      style={{ margin: '2px' }}
                      alt="board img"
                      className={currentImage === index ? 'active-image' : ''}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {isViewerOpen && (
          <div className="viewer-block">
            <div className="edit-btn-block d-flex justify-content-between align-items-center">
              <div className="d-flex">
                {isImageFormat &&
                firstStringData &&
                secondStringData &&
                thirdStringData &&
                fourthStringData ? (
                  <button
                    className="btn btn-warning m-2"
                    onClick={handleEditorOpen}
                  >
                    Редактировать
                  </button>
                ) : !isImageFormat ? (
                  ''
                ) : (
                  <span
                    className="d-inline-block"
                    tabIndex="0"
                    data-bs-toggle="tooltip"
                    title="Для открытия редактора активируйте режим редактирования таблицы"
                  >
                    <button
                      type="button"
                      className="btn btn-warning m-2"
                      disabled
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-custom-class="custom-tooltip"
                    >
                      Редактировать
                    </button>
                  </span>
                )}
                <button
                  className={
                    'save-original-btn btn btn-success' +
                    (!isImageFormat ? ' m-2' : ' m-2')
                  }
                  onClick={() => {
                    saveAs(
                      getOriginalUrls(imagesData)[currentImage],
                      getNames(imagesData)[currentImage]
                    )
                  }}
                >
                  <a
                    href={getOriginalUrls(imagesData)[currentImage]}
                    download
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    Скачать
                  </a>
                </button>
              </div>
              <div className="badge d-flex justify-content-center align-items-center">
                {getNames(imagesData).includes(
                  getNames(imagesData)[currentImage]
                )
                  ? getNames(imagesData)[currentImage]
                  : ''}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  textAlign: 'center'
                }}
                className="mx-2"
              >
                <div className="d-flex">
                  <div className="mx-3">
                    <ZoomIn onZoom={handleZoomIn} />
                    <ZoomOut onZoom={handleZoomOut} />
                  </div>
                  <div>
                    <RotateLeft handleClick={handleRotateLeft} />
                    <RotateRight handleClick={handleRotateRight} />
                  </div>
                </div>
              </div>
            </div>
            <ImageViewer
              src={allImages}
              currentIndex={currentImage}
              disableScroll={true}
              closeOnClickOutside={false}
              onClose={closeImageViewer}
              rightArrowComponent={
                <RightArrowComponent onChangeImage={changeImageRight} />
              }
              leftArrowComponent={
                <LeftArrowComponent onChangeImage={changeImageLeft} />
              }
              backgroundStyle={{
                backgroundColor: 'rgba(0,0,0,0.9)'
              }}
            />
          </div>
        )}

        {isEditorOpen && (
          <>
            <div className="close-save-btns d-flex justify-content-end align-items-center">
              <SaveAsBtn
                name="Сохранить"
                imagesData={imagesData}
                getUrls={getUrls}
                onAddImages={handleImages}
                firstStringData={firstStringData}
                secondStringData={secondStringData}
                thirdStringData={thirdStringData}
                fourthStringData={fourthStringData}
                newFileName={newFileName}
                currentImage={currentImage}
                getNames={getNames}
                changesEdit={changesEdit}
                setChangesEdit={setChangesEdit}
                changesViewer={changesViewer}
                setChangesViewer={setChangesViewer}
                setImagesData={setImagesData}
              />
              <SaveAsBtn
                name="Сохранить как"
                imagesData={imagesData}
                getUrls={getUrls}
                onAddImages={handleImages}
                firstStringData={firstStringData}
                secondStringData={secondStringData}
                thirdStringData={thirdStringData}
                fourthStringData={fourthStringData}
                newFileName={newFileName}
                currentImage={currentImage}
                getNames={getNames}
                changesEdit={changesEdit}
                setChangesEdit={setChangesEdit}
                changesViewer={changesViewer}
                setChangesViewer={setChangesViewer}
                setImagesData={setImagesData}
              />
              <div className="saveAsBtn">
                <button className="btn btn-danger mt-2" onClick={closeEditor}>
                  Вернуться в просмотр
                </button>
              </div>
            </div>
            <Editor
              path={allImages[currentImage]}
              firstStringData={firstStringData}
              secondStringData={secondStringData}
              thirdStringData={thirdStringData}
              fourthStringData={fourthStringData}
            />
          </>
        )}
      </>
    </div>
  )
}

const RightArrowComponent = (props) => {
  return (
    <span className="arrow" onClick={props.onChangeImage}>
      ❯
    </span>
  )
}
const LeftArrowComponent = (props) => {
  return (
    <span className="arrow" onClick={props.onChangeImage}>
      ❮
    </span>
  )
}

const ZoomIn = (props) => {
  return (
    <button className="btn btn-secondary" onClick={props.onZoom}>
      <i className="bi bi-zoom-in"></i>
    </button>
  )
}

const ZoomOut = (props) => {
  return (
    <button
      className="btn btn-secondary"
      style={{ marginLeft: '10px' }}
      onClick={props.onZoom}
    >
      <i className="bi bi-zoom-out"></i>
    </button>
  )
}

const RotateLeft = (props) => {
  return (
    <button onClick={props.handleClick} className="btn btn-secondary">
      <i className="bi bi-arrow-counterclockwise"></i>
    </button>
  )
}
const RotateRight = (props) => {
  return (
    <button
      onClick={props.handleClick}
      className="btn btn-secondary"
      style={{ marginLeft: '10px' }}
    >
      <i className="bi bi-arrow-clockwise"></i>
    </button>
  )
}

export default App
