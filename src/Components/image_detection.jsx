import React, { useState } from 'react';
import Navigation from './navigation';

const ImageDetection = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [imageName, setImageName] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for loading message

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = document.getElementById('uploadForm');
        const formData = new FormData(form);

        setIsLoading(true); // Show loading message

        try {
            const response = await fetch('http://127.0.0.1:3002/detect', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const firstUrl = data.image[0];
                setImageUrl(firstUrl);
                setIsResultVisible(true);
            } else {
                alert('Response is not ok for the request. Try again later or check your File format. Format Should be .jpg, .jpeg, .png!.');
            }
        } catch (error) {
            alert('Image is unable to send for detection because of server problem');
        } finally {
            setIsLoading(false); // Hide loading message
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            const form = document.getElementById('uploadForm');
            const inputFile = form.querySelector("input[type='file']");
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            inputFile.files = dataTransfer.files;

            setImageName(file.name);
            setImageUrl(''); // Clear result image
            setIsResultVisible(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageName(file.name);
            setImageUrl(''); // Clear result image
            setIsResultVisible(false);
        }
    };

    return (
        <>
            <Navigation />
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-indigo-500 mt-4">Object Detection By Image</h1>
                <div
                    className={`z-10 w-full h-full flex bg-white bg-opacity-60 ${dragActive ? 'border-indigo-500' : ''}`}
                    id="drag_box"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="extraOutline p-3 bg-white w-full m-auto rounded-lg">
                        <div
                            className="file_upload p-2 relative border-4 border-dotted border-gray-300 rounded-lg flex m-auto"
                            style={{ width: '80%', height: '100%' }}
                        >
                            <svg
                                className="text-indigo-500 w-20 mx-auto mb-0"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 26 26"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <div className="input_field flex flex-col w-max mx-auto text-center justify-center items-center">
                                <form id="uploadForm" onSubmit={handleSubmit}>
                                    <label>
                                        <input
                                            className="text-sm cursor-pointer w-36 hidden"
                                            type="file"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500">
                                            Select
                                        </div>
                                        <div className="title text-indigo-500 uppercase mt-2">
                                            or drop Image here
                                        </div>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {imageName && (
                    <p className="text-indigo-500 mt-4 mb-4 font-semibold">
                        Selected Image: {imageName}
                    </p>
                )}
                <button
                    className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-5 hover:bg-indigo-500 m-auto"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Detect
                </button>

                {isLoading && (
                    <p className="text-indigo-500 mt-4 mb-4 font-semibold">
                        Saving, please wait... Objects are detecting
                    </p>
                )}

                {isResultVisible && (
                    <div
                        id="result"
                        className="flex flex-col justify-center item-center"
                        style={{ width: '80%' }}
                    >
                        <p className="m-auto text-black-500 font-bold mt-3 mb-3 text-2xl">
                            Image
                        </p>
                        <a href={imageUrl} download="ResultImage.jpg">
                        <img
                            src={imageUrl}
                            alt="ImageResult"
                            id="resultImage"
                            className="m-auto mb-20 border-4 border-dotted border-gray-300 rounded-lg"
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default ImageDetection;
