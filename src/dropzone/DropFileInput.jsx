import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './DropFileInput.scss'
import { ImageConfig } from './ImageConfig'
import uploadImg from './assets/cloud-upload-regular-240.webp'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const DropFileInput = (props) => {
  const { onFileChange, limit, accept } = props
  const wrapperRef = useRef(null)
  const { t } = useTranslation()

  const [fileList, setFileList] = useState([])

  const onDragEnter = () => wrapperRef.current.classList.add('dragover')

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover')

  const onDrop = () => wrapperRef.current.classList.remove('dragover')

  const onFileDrop = (e) => {
    let newFile = e.target.files
    if (newFile && (!limit || fileList.length < limit)) {
      if (limit) newFile = Array.from(newFile).slice(0, limit - fileList.length)
      const updatedList = [...fileList, ...newFile]
      setFileList(updatedList)
      onFileChange(updatedList)
    }
  }
  const fileRemove = (file) => {
    const updatedList = [...fileList]
    updatedList.splice(fileList.indexOf(file), 1)
    setFileList(updatedList)
    onFileChange(updatedList)
  }

  const formatSize = (size) => {
    if (size < 1024) return `${size} B`
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    else if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`
    else return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`
  }

  const setClassNameitemContainer = () => {
    if (fileList.length >= 3 || fileList === null || !fileList) return 'itemContainer3'
    else return 'itemContainer' + fileList.length
  }

  return (
    <Box className="content">
      <Box className="box">
        <Box
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}>
          <Box className="drop-file-input__label">
            <img src={uploadImg} alt="" />
            <p>{'Arrastra los archivos aquí'}</p>
          </Box>
          <input
            type="file"
            multiple
            value=""
            onChange={onFileDrop}
            disabled={limit && fileList.length >= limit}
            accept={accept ? accept : undefined}
          />
        </Box>
        {fileList.length > 0 ? (
          <Box className="drop-file-preview">
            <p className="drop-file-preview__title">{'Listo para subir'}</p>
            <Box className={setClassNameitemContainer()}>
              {fileList.map((item, index) => (
                <Box key={index} className="drop-file-preview__item">
                  <img
                    className="imgPreview"
                    src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']}
                    alt=""
                  />
                  <Box className="drop-file-preview__item__info">
                    <p>{item.name}</p>
                    <p>{formatSize(item.size)}</p>
                  </Box>
                  <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>
                    x
                  </span>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func
}

export default DropFileInput
