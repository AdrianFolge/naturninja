import { useState, useEffect } from "react";
import { client } from 'lib/client';
import axios from "axios";
import { CloudinaryContext, Image } from "cloudinary-react";
import { useSession } from "next-auth/react"

const MAPBOX_TOKEN = "pk.eyJ1IjoiYWRyaWFuZmgiLCJhIjoiY2xmbWpqemR4MGM4MjQ0bnJoempobTE4byJ9.1w9_l2cCHgwDwqjnyZ-bmw"

function SubmitForm({ startpoint, endpoint, distance}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePublicId, setImagePublicId] = useState("");
  const [format, setFormat] = useState("");
  const [imgPath, setImgPath] = useState("");
  const { data: session } = useSession()
  const [city, setCity] = useState('');

  useEffect(() => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${startpoint[0]},${startpoint[1]}.json?access_token=${MAPBOX_TOKEN}&types=place&limit=1`)
      .then(response => response.json())
      .then(data => {
        const cityName = data.features[0].text;
        setCity(cityName);
      });
  }, [startpoint[0], startpoint[1]]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "kna2ki5b");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dweewlchz/image/upload",
          formData
        );
        setImagePublicId(response.data.public_id);
        setFormat(response.data.format);
        setImgPath(response.data.url);
        const doc = {
          _type: "hikes",
          img_path: response.data.url,
          title: title,
          overview: description,
          release_date: "06.01.2020",
          upvotes: 0,
          startpoint: startpoint,
          endpoint: endpoint,
          length: Number((distance/1000).toFixed(1)),
          mail: session.user.email,
          city: city
      }
      client.create(doc).then(res => {
          console.log(`Hike was created, document ID is ${res._id}`)
      })
      console.log(doc);
      } catch (error) {
        console.log(error);
      }
    }
    // Submit the form data to the server
    const formData = {
      title,
      description,
      imagePublicId,
    };
    // Make an HTTP request to submit the form data to the server
    // ...

  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    // Reset the image public ID when a new image is selected
    setImagePublicId("");
  };

  const formData = {
    title,
    description,
    imagePublicId,
  };
  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <div className="">
          <label
            htmlFor="title"
            className="block text-gray-700 font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-bold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
            {imagePublicId && (
                <CloudinaryContext cloudName="dweewlchz">
                    <Image publicId={imagePublicId} />
                </CloudinaryContext>
            )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export  default SubmitForm