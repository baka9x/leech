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


function getOriginalImageFromSrcSet(srcSet,dirName){
    const pattern = /https:\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?).jpg/g
    const ads1 = /https:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.jpg/g
    const ads2 = /https:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.gif/g
    srcSet = srcSet.replace(ads1, '')
    srcSet = srcSet.replace(ads2, '')

    imgSrc = srcSet.replace(pattern, '<p><img src="https://cdn6.manhwamanga.net/series/' +dirName+ '/$5.jpg"/></p>')
    //const pattern = /https:\/\/(.*?)\.jpg/g
    //imgSrc = srcSet.replace(pattern, '<p><img src="https://$1.jpg"/></p>')

    imgSrc = imgSrc.replace('/./', '/')
    return imgSrc
    }
async function getImagesFromUrl(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    //await page.setCookie(...cookies)
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() =>{
        const imgs = Array.from(document.querySelectorAll('.read-content img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))

        const ads1 = /https:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.jpg/g
        const ads2 = /https:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.gif/g
        srcSetAttribute = srcSetAttribute.replace(ads1, '')
        srcSetAttribute = srcSetAttribute.replace(ads2, '')
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
    instance.post('/wp_update_chapter3.php', {
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
    let mangaFolder = readline.question("Nhap Ten Manga: ")
    let chapterFolder = readline.question("Nhap Chapter: ")
 
    if(!fs.existsSync(mangaFolder)){
        fs.mkdirSync(mangaFolder)
    }
    resultFolder = './' + mangaFolder + '/' + chapterFolder

    if(!fs.existsSync(resultFolder)){
      fs.mkdirSync(resultFolder)
    }

     

    let urlLink = readline.question("Nhap Link Manga18fx: ")
    

    const images = await getImagesFromUrl(getLeechPath(urlLink))

    
    //console.log(images)

    images.forEach((img) => {
        downloader.image({
            headers: {
                Referer: urlLink
              },

            url: img,//.replace('https://', 'https://i2.wp.com/'),
            dest: resultFolder
        })
        .catch(err =>{
            console.log(err)
        })
    })

    const replaceUrls = images.map(srcSet => getOriginalImageFromSrcSet(srcSet, resultFolder))
    if(replaceUrls){
        console.log(replaceUrls.join('\n'))
        //const data = 'url=' + urlLink + '&content=' + replaceUrls.join('\n')
        sendTOBE(getLeechPath(urlLink), replaceUrls.join('\n'))
        //updateChapter(data)
    }
    
}
main()