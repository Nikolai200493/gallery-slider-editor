import React from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import 'tui-color-picker/dist/tui-color-picker.css'
import { saveAs } from 'file-saver'

export const Editor = (props) => {
  const bootboxModal = window.parent.document.querySelector('.bootbox modal')
  if (bootboxModal) {
    bootboxModal.style.backgroundColor = 'rgba(112, 112, 112, 0.5)'
  }
  setTimeout(() => {
    const loadBtn = document.querySelector(
      '.tui-image-editor-header-buttons div'
    )
    loadBtn.classList.add('load-button')
  })

  const locale_ru_RU = {
    Crop: 'Обрезать',
    Flip: 'Отразить',
    Rotate: 'Повернуть',
    Draw: 'Нарисовать',
    Shape: 'Формы',
    Icon: 'Изображение',
    Text: 'Текст',
    Mask: 'Маска',
    Filter: 'Фильтры',
    ZoomIn: 'Увеличить',
    ZoomOut: 'Уменьшить',
    Hand: 'Двигать',
    History: 'История',
    Load: 'Загрузка',
    Download: 'Скачать',
    Undo: 'Отменить',
    Redo: 'Повторить',
    Reset: 'Сброс',
    Delete: 'Удалить',
    DeleteAll: 'Удалить всё',
    Grayscale: 'Ч/Б',
    Sepia: 'Сепия',
    Sepia2: 'Сепия2',
    Invert: 'Инверт',
    Blur: 'Размыть',
    Sharpen: 'Резкость',
    Emboss: 'Тиснение',
    Distance: 'Влияние',
    Brightness: 'Яркость',
    Noise: 'Шум',
    Pixelate: 'Пиксели',
    'Color filter': 'Фильтр цвета',
    ColorFilter: 'Фильтр цвета',
    Threshold: 'Порог',
    Tone: 'Тон',
    Multiply: 'Умножить',
    Mix: 'Смешать',
    'Remove White': 'Убрать белый',
    RemoveWhite: 'Убрать белый',
    Add: 'Добавить',
    Blend: 'Добавить',
    Diff: 'Разница',
    Custom: 'Свой',
    Square: 'Квадрат',
    Apply: 'Применить',
    Cancel: 'Отмена',
    'Flip X': 'Отразить по X',
    'Flip Y': 'Отразить по Y',
    Range: 'Диапазон',
    Free: 'Свободно',
    Straight: 'Прямая',
    Color: 'Цвет',
    Rectangle: 'Прямоугольник',
    Circle: 'Круг',
    Triangle: 'Треугольник',
    Fill: 'Заливка',
    Stroke: 'Обводка',
    Arrow: 'Стрелка',
    'Arrow-2': 'Стрелка-2',
    'Arrow-3': 'Стрелка-3',
    'Star-1': 'Звезда-1',
    'Star-2': 'Звезда-2',
    Polygon: 'Полигон',
    Location: 'Локация',
    Heart: 'Сердце',
    Bubble: 'Выноска',
    Bold: 'Жирный',
    Underline: 'Подчеркнутый',
    Left: 'Лево',
    Center: 'Центр',
    Right: 'Право',
    Italic: 'Курсив',
    'Text size': 'Размер шрифта',
    'Load Mask Image': 'Загрузить маску'
  }

  if (props.path) {
    setTimeout(() => {
      const buttons = document.querySelector('.tui-image-editor-header-buttons')
      const loadBtn = buttons?.querySelector('div')
      if (buttons) {
        loadBtn.classList.add('hideBtn')
      }
    })
  }

  return (
    <>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: props.path,
            name: 'SampleImage'
          },
          locale: locale_ru_RU,
          menu: [
            'crop',
            'flip',
            'rotate',
            'draw',
            'shape',
            'icon',
            'text',
            'mask',
            'filter'
          ],
          initMenu: 'filter',
          uiSize: {
            width: '1000px',
            height: '700px'
          },
          menuBarPosition: 'left'
        }}
        cssMaxHeight={800}
        cssMaxWidth={1000}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={false}
      />
    </>
  )
}
