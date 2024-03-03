export const uploadToCloudinary = async (image) => {

    if (image) {

        const fdata = new FormData();
        fdata.append("file", image);
        fdata.append("upload_preset", "whatsapp");
        fdata.append("cloud_name", "dd98j4meb");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dd98j4meb/image/upload",
            {
                method: "POST",
                body: fdata
            }

        );

        const filedata= await res.json();
        
        // console.log(filedata)

        return filedata.url.toString();



    }
}