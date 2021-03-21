import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import React from 'react';
import axios from 'axios';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
// import Icon from '../Icon/icon';
import { Upload, UploadProps } from './upload';

jest.mock('../Icon/icon', () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: uploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
};

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

const testFile = new File(['dddd'], 'test.png', { type: 'image/png' });

describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>click to upload</Upload>);
    fileInput = wrapper.container.querySelector('.mantd-upload-input');
    uploadArea = wrapper.queryByText('click to upload');
  });
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: 'success' });
    // });
    mockedAxios.post.mockResolvedValue({ data: 'cool' });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    const listNode = waitFor(() => queryByText('spinner'));
    expect(listNode).toBeInTheDocument();
    // expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
    // await waitFor(() => {
    //   expect(queryByText('test.png')).toBeInTheDocument();
    // });
    // expect(queryByText('check-circle')).toBeInTheDocument();
  });
});
