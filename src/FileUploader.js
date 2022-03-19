import React, { useState } from 'react';
import S3 from 'react-aws-s3';
import { Buffer } from 'buffer'; // This is due to a bug in the library itself
window.Buffer = Buffer

const config = {
    bucketName: 'good-forest-static',
    dirName: 'imgs',
    region: 'us-east-2',
    accessKeyId: process.env.S3_KEY || '',
    secretAccessKey: process.env.S3_SECRET || ''
}
const ReactS3Client = new S3(config);

function FileUploader() {
    const [picName, setPicName] = useState(null);
    const [picPath, setPicPath] = useState(null);
    const [errors, setErrors] = useState(null);

    const upload = async (file) => {
        // here you can get file.name and file.size to add some validations
        setPicName(file.name)

        try {
            var result = await ReactS3Client.uploadFile(file);
            setPicPath(result.location)
        } catch (error) {
            setErrors(error.message)
        }
    }

    return (
        <div>
            <input
                type="file"
                onChange={(e) => upload(e.target.files[0])}></input>
            <div>File name: {picName}</div>
            <div>File path: {picPath}</div>
            <div>Errors: {errors}</div>
        </div>
    );
}

export default FileUploader;
