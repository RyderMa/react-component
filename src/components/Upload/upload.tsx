import React, { ChangeEvent, FC, useRef, useState } from 'react';
import Button from '../Button/button';
import axios from 'axios';

type UploadFileStatus =
  | 'ready'
  | 'uploading'
  | 'done'
  | 'success'
  | 'removed'
  | 'error';

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status?: UploadFileStatus;
  precent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

interface uploadProps {
  /**
   * 上传路径
   */
  action: string;
  /**
   * 已上传数组
   */
  defaultFileList?: UploadFile[];
  /**
   * 上传前的操作
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * 选择文件
   */
  onChange?: (file: File) => void;
  /**
   * 移除文件
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * 上传中回调
   */
  onProgress?: (percentage: number, file: File) => void;
  /**
   * 成功回调
   */
  onSuccess?: (data: any, file: File) => void;
  /**
   * 失败回调
   */
  onError?: (error: any, file: File) => void;
}

const Upload: FC<uploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
  } = props;
  const fileInputElement = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile> // 更新可选参数
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleCLick = () => {
    if (fileInputElement) {
      fileInputElement.current?.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInputElement.current) fileInputElement.current.value = '';
  };

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        postFile(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((preocessedFile) => {
            postFile(preocessedFile);
          });
        } else if (result !== false) {
          postFile(file);
        }
      }
    });
  };

  const postFile = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      precent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          'Content-type': 'mulitpart/form-data',
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded / e.total) * 100);
          onProgress && onProgress(percentage, file);
          updateFileList(_file, { precent: percentage, status: 'uploading' });
        },
      })
      .then((res) => {
        console.log('上传成功', res);
        updateFileList(_file, { status: 'done', response: res.data });
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file);
      })
      .catch((err) => {
        console.error('upload error:', err);
        updateFileList(_file, { status: 'error', error: err });
        onError && onError(err, file);
        onChange && onChange(file);
      });
  };

  return (
    <div className="mantd-upload">
      <input
        type="file"
        ref={fileInputElement}
        style={{ display: 'none' }}
        className="mantd-upload-input"
        onChange={handleChange}
      />
      <Button className="mantd-upload-button" onClick={handleCLick}>
        点击上传
      </Button>
    </div>
  );
};

export default Upload;
