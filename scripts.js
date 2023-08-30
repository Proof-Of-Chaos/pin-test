require("dotenv").config();

const fs = require("fs");
const path = require("path");
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.PINATA_API, process.env.PINATA_SECRET);

async function pin1000MetadataToIPFS() {
  // measure the execution time of the loop

  let hashes = [];

  console.time("pin1000MetadataToIPFS");
  for (let i = 0; i < 1000; i++) {
    const metadata = {
      name: `My NFT ${i}`,
      description: `This is my NFT number ${i}. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`,
      value: i,
      height: i,
      width: i,
      depth: i,
      weight: i,
      color: i,
      material: i,
      texture: i,
      sound: i,
    };
    console.timeEnd("pin1000MetadataToIPFS");
    const metadataURI = await pinata.pinJSONToIPFS(metadata);
    console.log(
      `pinned metadata for NFT ${i} at ${JSON.stringify(metadataURI)}`
    );
    hashes.push(metadataURI.IpfsHash);
  }

  fs.writeFileSync(
    path.join(__dirname, "../", "metadata.json"),
    JSON.stringify(hashes)
  );

  console.log("Done");
}

pin1000MetadataToIPFS();
