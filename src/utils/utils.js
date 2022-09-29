// get params from photo-urls data
export function getNames(imagesData) {
  const pd = [...imagesData]
  var names = []
  for (let i = 0; i < pd.length; ++i) {
    names.push(pd[i].name)
  }
  return names
}

export function getOriginalUrls(imagesData) {
  const pd = [...imagesData]
  var originalUrls = []
  for (let i = 0; i < pd.length; ++i) {
    if (
      pd[i].name.toLowerCase().endsWith('.jpeg') ||
      pd[i].name.toLowerCase().endsWith('.tiff') ||
      pd[i].name.toLowerCase().endsWith('.jpg') ||
      pd[i].name.toLowerCase().endsWith('.bmp') ||
      pd[i].name.toLowerCase().endsWith('.gif') ||
      pd[i].name.toLowerCase().endsWith('.png') ||
      pd[i].name.toLowerCase().endsWith('.svg')
    ) {
      originalUrls.push(pd[i].urlDl)
    } else {
      originalUrls.push(pd[i].urlPrev)
    }
  }
  return originalUrls
}

export function getUrls(imagesData) {
  const pd = [...imagesData]
  var urls = []
  for (let i = 0; i < pd.length; ++i) {
    urls.push(pd[i].urlPrev)
  }
  return urls
}
//--------------------------------------------------

// is images type
export function funcIsImageFormat(file) {
  if (
    file.name.toLowerCase().endsWith('.jpeg') ||
    file.name.toLowerCase().endsWith('.tiff') ||
    file.name.toLowerCase().endsWith('.jpg') ||
    file.name.toLowerCase().endsWith('.bmp') ||
    file.name.toLowerCase().endsWith('.gif') ||
    file.name.toLowerCase().endsWith('.png') ||
    file.name.toLowerCase().endsWith('.svg')
  ) {
    return true
  } else {
    return false
  }
}

export function funcIsImageFormatByName(imageName) {
  if (
    imageName?.toLowerCase().endsWith('.jpeg') ||
    imageName?.toLowerCase().endsWith('.tiff') ||
    imageName?.toLowerCase().endsWith('.jpg') ||
    imageName?.toLowerCase().endsWith('.bmp') ||
    imageName?.toLowerCase().endsWith('.gif') ||
    imageName?.toLowerCase().endsWith('.png') ||
    imageName?.toLowerCase().endsWith('.svg')
  ) {
    return true
  } else {
    return false
  }
}

export function funcIsImageFormatByUrl(url) {
  if (
    url?.endsWith('.jpeg') ||
    url?.endsWith('.tiff') ||
    url?.endsWith('.jpg') ||
    url?.endsWith('.bmp') ||
    url?.endsWith('.gif') ||
    url?.endsWith('.png') ||
    url?.endsWith('.svg')
  ) {
    return true
  } else {
    return false
  }
}
//--------------------------------------------------

// convert base64 to blob format
export function base64ToBlob(data) {
  const rImageType = /data:(image\/.+);base64,/
  const lImageType = /data:(application\/.+);base64,/

  if (data.startsWith('data:image/')) {
    let mimeString = ''
    let raw, uInt8Array, i
    raw = data.replace(rImageType, (header, imageType) => {
      mimeString = imageType

      return ''
    })
    raw = atob(raw)
    const rawLength = raw.length
    uInt8Array = new Uint8Array(rawLength) // eslint-disable-line
    for (i = 0; i < rawLength; i += 1) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: mimeString })
  } else if (data.startsWith('data:application/pdf')) {
    let mimeString = ''
    let raw, uInt8Array, i
    raw = data.replace(lImageType, (header, imageType) => {
      mimeString = imageType

      return ''
    })
    raw = atob(raw)
    const rawLength = raw.length
    uInt8Array = new Uint8Array(rawLength) // eslint-disable-line
    for (i = 0; i < rawLength; i += 1) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: mimeString })
  }
}
//--------------------------------------------------------------------

// remove initial data from local storage at first start
export function getAndRemoveFromStorage(key) {
  const data = localStorage.getItem(key)
  localStorage.removeItem(key)
  return data
}
//--------------------------------------------------------------------

// get degree from transform rotate
export function getDegreeElement(element) {
  var el = element
  var style = window.getComputedStyle(el, null)
  // получаем значение стилей
  var valueStyle =
    style.getPropertyValue('-webkit-transform') ||
    style.getPropertyValue('-moz-transform') ||
    style.getPropertyValue('-ms-transform') ||
    style.getPropertyValue('-o-transform') ||
    style.getPropertyValue('transform')
  // если стилей нет, то угол 0 градусов
  if (valueStyle == 'none') return 0
  // разбираем полученное значение
  // console.log(valueStyle)
  var values = valueStyle.split('(')[1]
  values = values.split(')')[0]
  values = values.split(',')
  // получаем синус и косинус
  var cos = values[0]
  var sin = values[1]
  // вычисляем угол
  var degree = Math.round(Math.asin(sin) * (180 / Math.PI))
  if (cos < 0) {
    var addDegree = 90 - Math.round(Math.asin(sin) * (180 / Math.PI))
    degree = 90 + addDegree
  }
  if (degree < 0) {
    degree = 360 + degree
  }
  return degree
}
//------------------------------------------------------------------------------
