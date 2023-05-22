async function ImagetoBase64(file){             //this funnction here we are using for the converted from url to 64 image
    const reader=new FileReader() // here created the object of the reader file
    reader.readAsDataURL(file)  // pass the url in reader and converted to image

    // for checking purpose it converted or not means 
    // meanse  resoleve or reject this converted to check we will use promise

    const data=new Promise((resolve, reject)=> {
        reader.onload=()=> resolve(reader.result)
        reader.onerror=err=>reject(err)
    })

    return data
}
 export {ImagetoBase64}