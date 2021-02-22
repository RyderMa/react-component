import React, { FC } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return <ul className="mantd-upload-list"></ul>;
};

export default UploadList;
