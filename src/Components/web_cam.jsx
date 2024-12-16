import React, { useState } from 'react';
import Navigation from './navigation';

const WebCam = () => {
    const [isStarting, setIsStarting] = useState(false); // State for the "starting" message

    // Function to start the webcam
    const startWebCam = async () => {
        setIsStarting(true); // Show the starting message
        try {
            const response = await fetch('http://127.0.0.1:3002/webcam?action=start');
            if (response.ok) {
                console.log('Webcam detection started.');
            } else {
                console.error('Failed to start webcam detection.');
            }
        } catch (error) {
            console.error('Error starting webcam detection:', error);
        } finally {
            setIsStarting(false); // Hide the starting message
        }
    };

    // Function to stop the webcam
    const stopWebCam = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3002/webcam?action=stop');
            if (response.ok) {
                console.log('Webcam detection stopped.');
            } else {
                console.error('Failed to stop webcam detection.');
            }
        } catch (error) {
            console.error('Error stopping webcam detection:', error);
        }
    };

    return (
        <>
            <Navigation />
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-indigo-500 mt-4 mb-20">Object Detection By Webcam</h1>
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <button
                        className="bg-indigo-600 text-white rounded font-semibold py-2 px-5 hover:bg-indigo-500"
                        onClick={startWebCam}
                    >
                        Start Webcam
                    </button>
                    {isStarting && (
                        <p className="text-indigo-500 mt-4 mb-4 font-semibold">
                            Webcam app is starting...
                        </p>
                    )}
                    <button
                        className="bg-indigo-600 text-white rounded font-semibold py-2 px-5 hover:bg-indigo-500 mt-4"
                        onClick={stopWebCam}
                    >
                        Stop Webcam
                    </button>
                </div>
            </div>
        </>
    );
};

export default WebCam;
