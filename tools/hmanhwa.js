const puppeteer = require('puppeteer')
const fs = require('fs')
const downloader = require('image-downloader')
const readline = require('readline-sync')
const axios = require('axios')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest



function getOriginalImageFromSrcSet(srcSet){//,dirName){
   // const pattern = /https:\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?).jpg/g
    //imgSrc = srcSet.replace(pattern, '<p><img src="https://cdn5.manhwamanga.net/series/' +dirName+ '/$5.jpg"/></p>')
    const pattern = /https:\/\/(.*?)\.jpg/g
    imgSrc = srcSet.replace(pattern, '<p><img src="https://$1.jpg"/></p>')
    
    //imgSrc = imgSrc.replace('/./', '/')
    return imgSrc.trim()
    }
async function getImagesFromUrl(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() =>{
        const imgs = Array.from(document.querySelectorAll('.reading-content img'))
        
        const srcSetAttribute = imgs.map(i => i.getAttribute('data-src'))
       
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

function trim(str) {

    const trimContent = str.trim()
      
    return trimContent
}

async function updateChapter(data){
    const request = new XMLHttpRequest();
    await request.open('POST', 'https://cdn5.manhwamanga.net/wp_update_chapter2.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);

}

async function main(){
    //Create result folder
    //let resultFolder = readline.question("Nhap Dir Truyen: ")
    //resultFolder = './result'
    // if(!fs.existsSync(resultFolder)){
    //     fs.mkdirSync(resultFolder)
    // }

    let urlLink = readline.question("Nhap Link Hmanhwa: ")
    
    let chapterId = readline.question("Nhap Chapter ID:")

    const images = await getImagesFromUrl(urlLink)
    //console.log(images)

    // images.forEach((img) => {
    //     downloader.image({
    //         url: img,
    //         dest: resultFolder
    //     })
    // })

    const replaceUrls = images.map(srcSet => getOriginalImageFromSrcSet(srcSet))//, resultFolder))

    if(replaceUrls){
        console.log(replaceUrls.join('\n'))
        const data = 'id=' + chapterId + '&content=' + replaceUrls.join('\n')
        updateChapter(data)
    }
}
main()