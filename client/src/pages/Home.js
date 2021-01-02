import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
export default function Home() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        console.log("return ing imamges from frontend");
        try {
            const res = await fetch('http://localhost:8000/api/images');
            const data = await res.json();
            setImageIds(data);
            console.log("data", data); 
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName="dwpx7quqp"
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}