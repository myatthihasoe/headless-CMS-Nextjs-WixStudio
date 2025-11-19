import Image from "next/image";
import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";

const myWixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: process.env.WIX_STUDIO_HEADLESS_CMS_CLIENT_ID!,
  })
})

const dataItemList = await myWixClient.items.query("YoutubeVideoHeadlessCms").find();
console.log(dataItemList);

export default function Home() {

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4">
          {/* <h1>Testing Headless CMS </h1>  */}
          {dataItemList.items.map(
            (item) => (
              <div key={item._id}>
                <div className="rounded h-48 w-full mb-4 relative" style={{ backgroundImage: `url(${item.thumbnailImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <h2 className="text-xl bold">{item.videoTitle}</h2>
                <p>{item.videoDescription}</p>
                <a href="#" target="_blank" className="bg-blue-500 text-white p-2 px-8 inline-block mt-4 rounded-lg">Watch Video</a>
                {/* <img src={item.thumbnailImage} alt={item.videoTitle} width={400} height={300} /> */}
                {/* {item.thumbnailImage && (
              <Image
                src={item.thumbnailImage}
                alt={item.videoTitle}
                width={400}
                height={300}
              />
            )} */}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
