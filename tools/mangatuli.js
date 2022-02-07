const puppeteer = require('puppeteer')
const fs = require('fs')
const downloader = require('image-downloader')
const readline = require('readline-sync')
//const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://img.manhwa16.xyz'
  });

  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  
function getLeechPath(url){
  const pattern = /https:\/\/(.*?)\/(.*?)\/chapter-(.*?)\.html/g
  if(url.match(pattern)){
    url = url.replace(pattern, 'https://manga18fx.com/manga/$2/chapter-$3')
  
  }
  //console.log(url)
  return url
}


function getOriginalImageFromSrcSet(srcSet){//,dirName){
   // const pattern = /https:\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?).jpg/g
    //imgSrc = srcSet.replace(pattern, '<p><img src="https://cdn5.manhwamanga.net/series/' +dirName+ '/$5.jpg"/></p>')
    
    const pattern = /https:\/\/(.*?)\.jpg/g
    const ads1 = />(.*?)\/(.*?)</g
    const pattern2 = /https:\/\/(.*?)\.webp/g
    srcSet = srcSet.replace(ads1, '')
    //srcSet = srcSet.replace(ads2, '')
    
    imgSrc = srcSet.replace(pattern, '<p><img src="https://$1.jpg"/></p>')
    imgSrc = imgSrc.replace(pattern2, '<p><img src="https://$1.webp"/></p>')
    imgSrc = imgSrc.trim()
    //imgSrc = imgSrc.replace('/./', '/')
    return imgSrc
    }
async function getImagesFromUrl(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    //await page.setCookie(...cookies)
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() =>{
        const imgs = Array.from(document.querySelectorAll('.reading-content img'))

        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
      
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

// async function updateChapter(data){
//     const request = new XMLHttpRequest()
//     await request.open('POST', 'https://cdn5.manhwamanga.net/wp_update_chapter3.php', true)
//     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
//     request.send(data)
//     console.log(request.responseXML)
// }

async function sendTOBE(url, content){
    instance.post('/wp_update_chapter4.php', {
        url: url,
        content: content
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("????????>>>" + error);
      });
}

async function main(){
    //Create result folder
    // let resultFolder = readline.question("Nhap Dir Truyen: ")
    // resultFolder = './result'
    // if(!fs.existsSync(resultFolder)){
    //     fs.mkdirSync(resultFolder)
    // }

    let urlLink = readline.question("Nhap Link mangatuli: ")
    

    const images = await getImagesFromUrl(getLeechPath(urlLink))

    
    //console.log(images)

    // images.forEach((img) => {
    //     downloader.image({
    //         url: img.replace('https://', 'https://i2.wp.com/'),
    //         dest: resultFolder
    //     })
    // })

    const replaceUrls = images.map(srcSet => getOriginalImageFromSrcSet(srcSet))//, resultFolder))
    if(replaceUrls){
        console.log(replaceUrls.join('\n'))
        //const data = 'url=' + urlLink + '&content=' + replaceUrls.join('\n')
        sendTOBE(getLeechPath(urlLink), replaceUrls.join('\n'))
        //updateChapter(data)
    }
    
}
main()