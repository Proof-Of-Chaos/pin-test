require("dotenv").config();

const fs = require("fs");
const path = require("path");
const ipfsOnlyHash = require("ipfs-only-hash");
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.PINATA_API, process.env.PINATA_SECRET);

async function pin1000MetadataToIPFS() {
  let hashes = [];
  let txs = [];

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

    // Convert the object to JSON
    const jsonData = JSON.stringify(metadata);

    // Hash the JSON data using IPFS algorithm
    try {
      const ipfsHash = await ipfsOnlyHash.of(Buffer.from(jsonData));
      const tx = pinata.pinByHash(ipfsHash, {
        pinataMetadata: {
          name: `My NFT ${i}`,
        },
      });
      txs.push(tx);
      hashes.push(ipfsHash);
    } catch (err) {
      console.log(err);
    }

    console.timeLog("pin1000MetadataToIPFS");
  }

  await Promise.all(txs);

  fs.writeFileSync(
    path.join(__dirname, "../", "metadata.json"),
    JSON.stringify(hashes)
  );

  console.log("Done");
}

pin1000MetadataToIPFS().catch((err) => console.log(err));
