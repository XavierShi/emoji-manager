import { Upload } from '@arco-design/web-react'
import React, { useEffect } from 'react'

const Add: React.FC = () => {
  useEffect(() => {
    const createDir = async () => {
      await window.emAdd.createDir()
    }
    createDir()
  })

  const cpImg = async (file: File) => {
    console.log(file)
    console.log({
      name: file.name,
      path: file.path,
    })
    await window.emAdd.cpImg({
      name: file.name,
      path: file.path,
    })
  }

  return (
    <div>
      Add
      <Upload
        drag
        multiple
        accept='image/*'
        onDrop={(e) => {
          let uploadFile = e.dataTransfer.files[0]
          cpImg(uploadFile)
          return false
        }}
        showUploadList={false}
        tip='Only pictures can be uploaded'
      />
    </div>
  )
}

export default Add
