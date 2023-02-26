import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import type { Message } from 'js-sha256';
import { sha256 } from 'js-sha256';
import 'react-quill/dist/quill.snow.css';
import { Segmented } from 'antd';
import {
  getFileRoot,
  preupload,
  directUpload,
  fragmentUpload,
  mergeFragment,
} from '@/services/file';
import Upload from '@/components/Upload';
const Editor: React.FC = () => {
  const [value, setValue] = useState('');

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

const Submit: React.FC = () => {
  const [value, setValue] = useState<string | number>('富文本编辑器');
  const [rootId, setRootId] = useState<number>(-1);
  useEffect(() => {
    async function init() {
      const { payload } = await getFileRoot();
      setRootId(payload.id);
    }
    init();
  }, []);

  const fileToArrayBuffer = (file: Blob) => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.addEventListener(
        'loadend',
        (e) => {
          const buf = e.target?.result;
          resolve(buf);
        },
        false,
      );
    });
  };

  const handlePart = async (id: string, hash: string, sharding: [], file: File) => {
    let start = 0,
      end = 0;
    for (let i = 0; i < sharding.length; i++) {
      end += sharding[i];
      const partFile = file.slice(start, end);
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const partBuffer = await fileToArrayBuffer(partFile);
      const partHash = sha256(partBuffer as Message);
      await fragmentUpload({
        uuid: id,
        sha256: hash,
        sha256Part: partHash,
        index: i,
        sharding: true,
        file: partFile,
      });
      start += sharding[i];
    }
  };

  const handleUpload = async (fileObj: any) => {
    const { file } = fileObj;
    const { name, size } = file;
    const buf = await fileToArrayBuffer(file);
    const hash = sha256(buf as Message);
    const { id, type, sharding } = await preupload({
      sha256: hash,
      fileName: name,
      parentId: rootId,
      fileSize: size,
    });
    if (type === 0) {
      await directUpload({ uuid: id, index: 0, sharding: false, sha256: hash, file: file });
    }
    if (type === 1) {
      await handlePart(id, hash, sharding, file);
    }
    await mergeFragment({ uuid: id });
  };

  return (
    <div>
      <Segmented
        options={['富文本编辑器', '文件上传']}
        value={value}
        onChange={(val) => {
          console.log(val);
          setValue(val);
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      />
      {value === '富文本编辑器' ? <Editor /> : <Upload onSubmit={handleUpload} />}
    </div>
  );
};

export default Submit;
