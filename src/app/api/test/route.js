import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "digt6qmlx",
  api_key: "597482981348219",
  api_secret: "Ib7fOG_CUtnU212xSXKzzO2bxCQ",
});

const res = await cloudinary.uploader.upload(
  "https://res.cloudinary.com/demo/image/upload/sample.jpg"
);

console.log(res);
