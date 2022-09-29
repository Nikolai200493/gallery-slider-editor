import React from 'react'
import { base64ToBlob } from '../utils/utils'
import { funcIsImageFormatByUrl } from '../utils/utils'

export const SaveAsBtn = (props) => {

  const showPopUp = () => {
    setTimeout(() => {
      const popUpMessage = document.createElement('div')
      popUpMessage.style.color = '#fff'
      popUpMessage.style.position = 'absolute'
      popUpMessage.style.left = '44%'
      popUpMessage.style.top = '60px'
      popUpMessage.style.border = '1px solid #fff'
      popUpMessage.style.borderRadius = '5px'
      popUpMessage.style.padding = '5px'
      popUpMessage.style.zIndex = '9999'
      popUpMessage.textContent =
        props.name === 'Сохранить'
          ? 'Фотография обновлена'
          : 'Фотография добавлена'
      document.body.prepend(popUpMessage)
      setTimeout(() => {
        popUpMessage.remove()
      }, 1500)
    }, 1500)
  }
  const showTimer = () => {
    const popUpMessage = document.createElement('div')
    popUpMessage.style.color = '#fff'
    popUpMessage.style.position = 'absolute'
    popUpMessage.style.left = '44%'
    popUpMessage.style.top = '60px'
    popUpMessage.style.border = '1px solid #fff'
    popUpMessage.style.borderRadius = '5px'
    popUpMessage.style.padding = '5px'
    popUpMessage.style.zIndex = '9999'
    popUpMessage.textContent = 'Сохранение...'
    document.body.prepend(popUpMessage)
    setTimeout(() => {
      popUpMessage.remove()
    }, 1500)
  }

  const handleSaveAs = () => {
    const upperCanvas = document.querySelector('.lower-canvas')
    const dataUrl = upperCanvas.toDataURL()
    const fileBin = base64ToBlob(dataUrl)

    if (props.name === 'Сохранить как') {
      let urlName = prompt(
        'Имя файла',
        props.newFileName ||
          props.getNames(props.imagesData)[props.currentImage]
      )
      if (urlName) {
        showTimer()
        const currentName = props.getNames(props.imagesData)[props.currentImage]
        if (!funcIsImageFormatByUrl(urlName)) {
          const lastPoint = currentName.lastIndexOf('.')
          const extension = currentName.slice(lastPoint)
          urlName = urlName + extension
        }
        if (urlName === props.getNames(props.imagesData)[props.currentImage]) {
          urlName = '1' + urlName
        }

        const oldUrls = props.getUrls(props.imagesData)
        if (urlName) {
          // at server send
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

          const pd = [...props.imagesData]
          var pdi
          if (props.currentImage >= 0 && props.currentImage < pd.length) {
            pdi = pd[props.currentImage]
          }
          formData.append('TabId', props.firstStringData)
          formData.append(props.secondStringData, props.thirdStringData)
          formData.append(props.fourthStringData, fileBin)
          if (props.newFileName) {
            formData.append('NewFileName', urlName)
          } else {
            if (pdi) {
              formData.append('NewFileName', urlName)
            }
          }

          // XMLHttpRequest
          let request = new XMLHttpRequest()
          request.open(
            'POST',
            '/index.php/FileController/UploadFileForm',
            false
          )
          try {
            request.send(formData)
            const responseXhr = JSON.parse(request.responseText)[0]
            const updatedResponseXhr = { ...responseXhr }
            updatedResponseXhr.urlDl = `/index.php/FileController/DownloadFile/${responseXhr.ID}`
            updatedResponseXhr.urlPrev = `/index.php/FileController/GetPreView/${responseXhr.ID}/preview.JPG`
            updatedResponseXhr.name = responseXhr.Name
            props.setImagesData((prevState) => {
              return [...prevState, updatedResponseXhr]
            })
            props.setChangesEdit('saved by save as')
            props.setChangesViewer('saved by save as')

            showPopUp()
          } catch (error) {
            alert('Ошибка, перезагрузите страницу')
            console.log('error', error)
          }
        } else {
          return
        }
      }
    } else if (props.name === 'Сохранить') {
      showTimer()
      // at server send
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

      const pd = [...props.imagesData]
      var pdi
      if (props.currentImage >= 0 && props.currentImage < pd.length) {
        pdi = pd[props.currentImage]
      }
      formData.append('TabId', props.firstStringData)
      formData.append(props.secondStringData, props.thirdStringData)
      formData.append(props.fourthStringData, fileBin)
      if (props.newFileName) {
        formData.append('NewFileName', props.newFileName)
        formData.append('OldFileId', pdi.id)
      } else {
        if (pdi) {
          formData.append('NewFileName', pdi.name)
          formData.append('OldFileId', pdi.id)
        }
      }
      if (pdi.id) {
        formData.append('OldFileId', pdi.id)
      } else {
        formData.append('OldFileId', pdi.id)
      }

      // XMLHttpRequest
      const photoData = [...props.imagesData]
      let currentId = null
      if (photoData[props.currentImage].ID) {
        currentId = photoData[props.currentImage].ID
      } else {
        currentId = photoData[props.currentImage].id
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
        props.setChangesEdit('saved by save')
        props.setChangesViewer('saved by save')
        showPopUp()
      } catch (error) {
        alert('Ошибка, перезагрузите страницу')
        console.log('error', error)
      }
    }
  }
  return (
    <div className="saveAsBtn">
      <button className="btn btn-success mt-2" onClick={handleSaveAs}>
        {props.name}
      </button>
    </div>
  )
}