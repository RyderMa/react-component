import React, { FC } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="mantd-upload-list">
      {fileList.map((file) => (
        <li key={file.uid} className="mantd-upload-list-item">
          <span className={`file-name file-name-${file.status}`}>
            <Icon icon="file-alt" theme="secondary"></Icon>
            {file.name}
          </span>
          <span className="file-status">
            {file.status === 'done' && (
              <Icon icon="check-circle" theme="success"></Icon>
            )}
            {file.status === 'error' && (
              <Icon icon="times-circle" theme="danger"></Icon>
            )}
            {file.status === 'uploading' && (
              <Icon icon="spinner" spin theme="primary"></Icon>
            )}
          </span>
          <span
            className="file-remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove && onRemove(file);
            }}
          >
            <Icon icon="trash-alt" theme="secondary"></Icon>
          </span>
          {file.status === 'uploading' && (
            <Progress percent={file.precent || 0} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
